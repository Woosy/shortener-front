<template>
  <div>
    <!---------------------------------->
    <!-- search / filter / sort -->
    <!---------------------------------->
    <div class="flex justify-between text-sm mb-3 flex-wrap">
      <div class="flex items-center flex-wrap">
        <!---------------------------------->
        <!-- search input -->
        <div class="my-1 relative rounded-md shadow-sm w-full md:w-48 max-w-xl text-gray-500 md:mr-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 sm:text-sm rounded-md focus:outline-none"
          >
          <div class="absolute inset-y-0 right-0 flex items-center mr-3">
            <font-awesome-icon :icon="searchQuery ? 'times' : 'search'" @click="searchQuery = ''" />
          </div>
        </div>

        <!---------------------------------->
        <!-- filter members -->
        <div class="my-1 py-2 flex -space-x-1 overflow-hidden mr-4">
          <img
            v-for="(member, index) in current.members"
            :key="index"
            :src="member.avatar_url"
            :title="member.username"
            :alt="`${member.username}'s avatar`"
            class="inline-block h-8 w-8 rounded-full border-2 transform hover:scale-105 hover:-translate-y-1 duration-100"
            :class="isMemberSelected(member.id) ? 'border-indigo-400 dark:border-white' : 'border-gray-200 dark:border-gray-900'"
            @click="toggleMemberSelected(member.id)"
          >
        </div>

        <!---------------------------------->
        <!-- my own links -->
        <button
          class="my-0 px-3 py-2 rounded focus:outline-none transition duration-150 mr-4"
          :class="onlyOwn
            ? 'bg-gray-600 text-gray-100 dark:bg-gray-400 dark:text-gray-900'
            : 'bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-100'"
          @click="onlyOwn = !onlyOwn"
        >
          <span class="text-xs font-medium">
            Only my own links
          </span>
        </button>

        <!---------------------------------->
        <!-- clean all filters/search -->
        <span
          class="my-1 text-gray-600 hover:text-gray-400 cursor-pointer"
          @click="clearSelection()"
        >
          Clear all
        </span>
      </div>

      <div class="my-3 flex">
        <!---------------------------------->
        <!-- filter by tags -->
        <base-dropdown class="z-10 mr-2">
          <template v-slot:button>
            <button class="bg-white dark:bg-gray-700 px-3 py-2 rounded shadow font-medium text-gray-600 dark:text-gray-100 focus:outline-none transition duration-150">
              <font-awesome-icon icon="tags" />
            </button>
          </template>

          <template v-slot:content>
            <div class="p-4 bg-white dark:bg-gray-700 text-black rounded">
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                :autocomplete-items="filteredTags"
                @tags-changed="newTags => tags = newTags"
              />
            </div>
          </template>
        </base-dropdown>

        <!---------------------------------->
        <!-- add new link -->
        <button class="flex items-center bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded shadow text-sm font-medium text-white focus:outline-none transition duration-150" @click="$store.commit('layout/TOGGLE_CREATE_LINK_MODAL', true)">
          <font-awesome-icon icon="plus" class="mr-1 text-xs" />
          <span>New</span>
        </button>
      </div>
    </div>

    <!---------------------------------->
    <!-- placeholder (aucun lien) -->
    <!---------------------------------->
    <div v-if="links.length === 0">
      <div class="w-full flex flex-col items-center justify-center">
        <img src="@/assets/images/svg/undraw_empty.svg" class="my-10 w-80">
        <p class="text-gray-600 text-center">
          It looks like this workspace doesn't have any links yet.
          You can start creating links by <span class="text-indigo-500 hover:underline cursor-pointer" @click="$store.commit('layout/TOGGLE_CREATE_LINK_MODAL', true)">clicking here</span>.
        </p>
      </div>
    </div>

    <div v-if="links.length > 0 && matchingLinks.length === 0">
      <div class="w-full flex flex-col items-center justify-center">
        <img src="@/assets/images/svg/undraw_empty.svg" class="my-10 w-80">
        <p class="text-gray-600 text-center">
          Couldn't find any links matching your search params...
        </p>
      </div>
    </div>

    <!---------------------------------->
    <!-- liste des liens -->
    <!---------------------------------->
    <manage-links-table
      v-show="links.length > 0 && matchingLinks.length > 0"
      :cols="['AUTHOR', 'LINK', 'TAGS', 'CREATION DATE', 'CLICKS', '']"
      :per-page="pagination.perPage"
      :current-page="pagination.currentPage"
      :matching-links="matchingLinks"
      :displayed-links="displayedLinks"
      @previous-page="previousPage"
      @change-page="changePage"
      @next-page="nextPage"
      @toggle-per-page="togglePerPage"
      @sort-date="sortDate"
      @sort-clicks="sortClicks"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  data () {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1
      },
      searchQuery: '',
      selectedMembers: [] as number[],
      onlyOwn: false,
      tag: '',
      tags: [],
      dateSorting: 'up',
      clicksSorting: 'none'
    }
  },
  computed: {
    ...mapGetters('links', [
      'tagsList'
    ]),
    ...mapState('links', [
      'links'
    ]),
    ...mapState('workspaces', [
      'current'
    ]),
    filteredTags (): any[] {
      return this.tagsList.filter((i) => {
        return i.text.toLowerCase().includes(this.tag.toLowerCase())
      })
    },
    matchingLinks (): Array<object> {
      // "search bar"
      const q = this.searchQuery.toLowerCase()
      let links = this.links.filter(link =>
        link.title.toLowerCase().includes(q) ||
        link.long_url.toLowerCase().includes(q) ||
        link.key.toLowerCase().includes(q) ||
        link.tags.find(tag => tag.value.toLowerCase().includes(q))
      )

      // "members selection"
      if (this.selectedMembers.length > 0) {
        links = links.filter(link => this.selectedMembers.includes(link.user.id))
      }

      // "filter tags"
      if (this.tags.length > 0) {
        links = links.filter((link) => {
          return link.tags.some((tag) => {
            return this.tags.some((t: any) => {
              return t.text.toLowerCase() === tag.value.toLowerCase()
            })
          })
        })
      }

      // "only my own"
      if (this.onlyOwn) {
        links = links.filter(link => link.user.id === this.$auth.user.id)
      }

      links.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      // sort by date
      if (this.dateSorting === 'up') {
        links.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      } else if (this.dateSorting === 'down') {
        links.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      }

      // sort by clicks
      if (this.clicksSorting === 'up') {
        links.sort((a, b) => b.clicks.length - a.clicks.length)
      } else if (this.clicksSorting === 'down') {
        links.sort((a, b) => a.clicks.length - b.clicks.length)
      }

      return links
    },
    // links that are displayed (pagination logic)
    displayedLinks (): Array<object> {
      const from = (this.pagination.currentPage * this.pagination.perPage) - this.pagination.perPage
      const to = this.pagination.currentPage * this.pagination.perPage

      return this.matchingLinks.slice(from, to)
    }
  },
  watch: {
    matchingLinks () {
      // go back to 1st page when matchingLinks is updated
      this.pagination.currentPage = 1
    }
  },
  methods: {
    previousPage () {
      if (this.pagination.currentPage <= 1) { return }
      this.pagination.currentPage = this.pagination.currentPage - 1
    },
    changePage (page) {
      this.pagination.currentPage = page
    },
    nextPage () {
      let count = Math.trunc(this.matchingLinks.length / this.pagination.perPage)
      if ((this.matchingLinks.length % this.pagination.perPage) !== 0) { count += 1 }
      if (this.pagination.currentPage === count) { return }
      this.pagination.currentPage = this.pagination.currentPage + 1
    },
    togglePerPage (val) {
      this.pagination.perPage = val
      this.pagination.currentPage = 1
    },
    toggleMemberSelected (memberId: number) {
      this.isMemberSelected(memberId)
        ? this.selectedMembers = this.selectedMembers.filter(id => id !== memberId)
        : this.selectedMembers.push(memberId)
    },
    isMemberSelected (memberId) {
      return this.selectedMembers.includes(memberId)
    },
    clearSelection () {
      this.searchQuery = ''
      this.selectedMembers = []
      this.onlyOwn = false
      this.tags = []
    },
    sortDate (val) {
      this.dateSorting = val
    },
    sortClicks (val) {
      this.clicksSorting = val
    }
  }
})
</script>

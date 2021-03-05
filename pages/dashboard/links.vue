<template>
  <div>
    <!---------------------------------->
    <!-- search / filter / sort -->
    <!---------------------------------->
    <div>
      <div class="flex justify-between text-sm mb-3 flex-wrap">
        <div class="flex items-center flex-wrap">
          <!-- search input -->
          <div class="my-1 relative rounded-md shadow-sm w-full md:w-48 max-w-xl text-gray-500 md:mr-4">
            <input
              v-model="query"
              type="text"
              placeholder="Search..."
              class="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 sm:text-sm rounded-md focus:outline-none"
            >
            <div class="absolute inset-y-0 right-0 flex items-center mr-3">
              <font-awesome-icon :icon="query ? 'times' : 'search'" @click="query = ''" />
            </div>
          </div>

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

          <!-- clean all filters/search -->
          <span
            class="my-1 text-gray-600 hover:text-gray-400 cursor-pointer"
            @click="clearSelection()"
          >
            Effacer tout
          </span>
        </div>

        <div class="my-3 flex">
          <button class="flex items-center bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded shadow text-sm font-medium text-white focus:outline-none transition duration-150 mr-2" @click="$store.commit('layout/TOGGLE_CREATE_LINK_MODAL', true)">
            <font-awesome-icon icon="plus" class="mr-1 text-xs" />
            <span>Add</span>
          </button>

          <button class="bg-white dark:bg-gray-700 px-3 py-1 rounded shadow text-sm font-medium text-gray-600 dark:text-gray-100 focus:outline-none transition duration-150">
            <font-awesome-icon icon="filter" />
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
      <base-table
        v-show="links.length > 0 && matchingLinks.length > 0"
        :cols="['AUTHOR', 'LINK', 'TAGS', 'CREATION DATE', 'CLICKS', '']"
      >
        <tr v-for="(link, index) in matchingLinks" :key="index">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="link.user.avatar_url"
                  alt="PP"
                >
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ link.user.username }}
                </div>
                <div class="text-sm text-gray-500 truncate">
                  {{ link.user.email }}
                </div>
              </div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900 dark:text-white">
              {{ link.title }}
            </div>
            <div class="text-sm text-gray-500">
              <a :href="`http://127.0.0.1:3333/${link.key}`" target="_blank">
                {{ `http://127.0.0.1:3333/${link.key}` }}
              </a>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap max-w-md overflow-hidden ">
            <div class="flex space-x-1">
              <div
                v-for="(tag, i) in link.tags"
                :key="i"
                class="flex items-center justify-center px-2 py-1 bg-indigo-500 rounded"
              >
                <span class="text-xs text-white">
                  {{ tag.value }}
                </span>
              </div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 whitespace-no-wrap">
            {{ $dateFns.format(link.created_at, 'dd-MM-yyyy à HH:mm') }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ link.clicks.length }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2 ">
              <button
                title="Copy link"
                class="flex items-center justify-center h-6 w-10 border border-indigo-600 bg-white dark:bg-gray-800 hover:bg-indigo-600 dark-hover:bg-indigo-600 text-indigo-600 hover:text-white rounded transition duration-200 focus:outline-none"
                @click="copyLink(link)"
              >
                <font-awesome-icon icon="clipboard" />
              </button>

              <button
                title="Delete link"
                class="flex items-center justify-center h-6 w-10 border border-red-600 bg-white dark:bg-gray-800 hover:bg-red-600 dark-hover:bg-red-600 text-red-600 hover:text-white rounded transition duration-200 focus:outline-none"
                @click="deleteLink(link)"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </td>
        </tr>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  data () {
    return {
      query: '',
      onlyOwn: false,
      selectedMembers: [] as number[]
    }
  },
  computed: {
    ...mapState('links', [
      'links'
    ]),
    ...mapState('workspaces', [
      'current'
    ]),
    matchingLinks (): Array<object> {
      // "search bar"
      const q = this.query.toLowerCase()
      let result = this.links.filter(link =>
        link.title.toLowerCase().includes(q) ||
        link.long_url.toLowerCase().includes(q) ||
        link.key.toLowerCase().includes(q) ||
        link.tags.find(tag => tag.value.toLowerCase().includes(q))
      )

      // "members selection"
      if (this.selectedMembers.length > 0) {
        result = result.filter(link => this.selectedMembers.includes(link.user.id))
      }

      // "only my own"
      return this.onlyOwn
        ? result.filter(link => link.user.id === this.$auth.user.id)
        : result
    }
  },
  methods: {
    toggleMemberSelected (memberId: number) {
      this.isMemberSelected(memberId)
        ? this.selectedMembers = this.selectedMembers.filter(id => id !== memberId)
        : this.selectedMembers.push(memberId)
    },
    isMemberSelected (memberId) {
      return this.selectedMembers.includes(memberId)
    },
    clearSelection () {
      this.query = ''
      this.selectedMembers = []
      this.onlyOwn = false
    },
    copyLink (link) {
      navigator.clipboard.writeText(`http://127.0.0.1:3333/${link.key}`)
        .then(() => {
          this.$toasted.global.success({ message: 'Link copied to clipboard!' })
        }, () => {
          this.$toasted.global.error({ message: 'Couldn\'t copy to clipboard!' })
        })
    },
    deleteLink (link) {
      this.$confirm({
        title: 'Are you sure?',
        message: 'All clicks associated to this link will also be deleted and removed from your statistics.',
        buttons: {
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        callback: (confirm) => {
          if (!confirm) { return }

          this.$store.dispatch('links/removeLink', link.id)
            .then(() => {
              this.$toasted.global.success({ message: 'Link sucessfully deleted.' })
            }).catch((err) => {
              this.$toasted.global.error({ message: err?.response?.data?.errors[0]?.message })
            })
        }
      })
    }
  }
})
</script>

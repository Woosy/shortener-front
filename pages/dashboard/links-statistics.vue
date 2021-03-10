<template>
  <div class="flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-8">
    <!------------------------------>
    <!-- "search bar" -->
    <!------------------------------>
    <div class="w-full xl:max-w-sm bg-white dark:bg-gray-800 rounded-lg">
      <div class="flex flex-col">
        <!---------------------------->
        <!-- search input -->
        <!---------------------------->
        <div class="p-5 relative text-gray-500 border-b border-gray-200 dark:border-gray-700">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
          >
          <div class="absolute inset-y-0 right-0 flex items-center mr-8">
            <font-awesome-icon :icon="searchQuery ? 'times' : 'search'" @click="searchQuery = ''" />
          </div>
        </div>

        <!---------------------------->
        <!-- links result -->
        <!---------------------------->
        <div
          id="link-container"
          class="flex flex-col overflow-y-auto custom-scrollbar"
          style="max-height: 725px !important"
        >
          <div
            v-for="(link, index) in matchingLinks"
            :id="'link-' + link.id"
            :key="index"
            class="px-5 py-4 flex flex-row justify-between space-x-2"
            :class="{
              'bg-gray-100 dark:bg-gray-700': current.id === link.id,
              'border-b dark:border-gray-700': index !== (matchingLinks.length - 1)
            }"
            @click="setCurrent(link)"
          >
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">
                {{ $dateFns.format(link.created_at, 'MMM d, H:mm').toUpperCase() }}
              </span>
              <h3 class="text-base font-medium text-black dark:text-gray-300">
                {{ link.title }}
              </h3>
              <a
                :href="`${apiUrl}/${current.key}`"
                target="_blank"
                class="mt-1 text-sm text-indigo-400 "
              >
                linkkk.to/{{ link.key }}
              </a>
            </div>

            <div class="flex items-end">
              <p class="text-black dark:text-white text-sm">
                <span class="pr-2">{{ link.clicks.length }}</span>
                <font-awesome-icon icon="mouse" class="text-gray-500 dark:text-gray-600 text-xs" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!----------------------------------->
    <!-- statistics -->
    <!----------------------------------->
    <div class="hidden xl:block p-5 xl:w-full">
      <!----------------------------------->
      <!-- placeholder: no selected link -->
      <!----------------------------------->
      <div v-if="!current.created_at" class="flex flex-col items-center justify-center">
        <img src="@/assets/images/svg/undraw_select.svg" class="mb-10 w-80">
        <p class="text-gray-600 text-center">
          Start by selecting the link whose statistics you want to see...
        </p>
      </div>

      <div v-if="current.created_at">
        <!---------------------------------->
        <!-- top part: link informations --->
        <!---------------------------------->
        <div class="flex flex-col border-b border-gray-400 dark:border-gray-700">
          <!-- date & author -->
          <div class="mb-3">
            <p class="text-xs text-gray-600 dark:text-gray-500">
              CREATED {{ $dateFns.format(current.created_at, 'MMM d, H:mm').toUpperCase() }} |
              <span class="text-indigo-500">
                {{ current.user.username }}
              </span>
            </p>
          </div>

          <!-- title & tags -->
          <div class="mb-1 flex flex-row items-center space-x-6">
            <h3 class="text-lg font-medium text-black dark:text-gray-200">
              {{ current.title }}
            </h3>

            <div class="flex space-x-1">
              <div
                v-for="(t, i) in current.tags"
                :key="i"
                class="flex items-center justify-center px-2 py-1 bg-indigo-500 rounded "
              >
                <span class="text-xs text-white whitespace-no-wrap">
                  {{ t.value }}
                </span>
              </div>
            </div>
          </div>

          <!-- long_url (destination) -->
          <p class="text-sm text-gray-600 ">
            <a :href="current.long_url" target="_blank" rel="noopener noreferrer">
              {{ current.long_url }}
            </a>
          </p>

          <!-- short url + actions -->
          <div>
            <div class="py-6 flex flex-row items-center space-x-2">
              <p class="text-sm text-indigo-500">
                <a :href="`${apiUrl}/${current.key}`" target="_blank">
                  linkkk.to/<span class="font-semibold">{{ current.key }}</span>
                </a>
              </p>

              <div>
                <span class="text-xs text-indigo-500 ">
                  <!-- TODO: implement -->
                  <button class="px-2 py-px border border-indigo-500 rounded transition duration-200 focus:outline-none">
                    COPY
                  </button>

                  <!-- TODO: implement -->
                  <button class="px-2 py-px border border-indigo-500 rounded transition duration-200 focus:outline-none">
                    DELETE
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!---------------------------------->
        <!-- bottom part: link statistics -->
        <!---------------------------------->
        <div class="mt-10">
          <div v-if="current.clicks.length === 0" class="flex flex-col items-center justify-center">
            <img src="@/assets/images/svg/undraw_empty.svg" class="mb-10 w-80">
            <p class="text-gray-600 text-center">
              Nothing to show. This link has never been clicked on...
            </p>
          </div>

          <div v-if="current.clicks.length > 0">
            <!--  -->
          </div>
        </div>
      </div>
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
      apiUrl: process.env.API_URL,
      searchQuery: '',
      selected: 0
    }
  },
  computed: {
    ...mapState('links', [
      'links'
    ]),
    matchingLinks (): Array<object> {
      const q = this.searchQuery.toLowerCase()
      const links = this.links.filter(link =>
        link.title.toLowerCase().includes(q) ||
        link.long_url.toLowerCase().includes(q) ||
        link.key.toLowerCase().includes(q) ||
        link.tags.find(tag => tag.value.toLowerCase().includes(q))
      )
      return links
    },
    current (): object {
      if (!this.selected) { return {} }
      const link = this.links.find(link => link.id === this.selected)
      return link || {}
    }
  },
  mounted () {
    this.selected = Number(this.$route.query.selected)

    // scroll to the selected div
    setTimeout(() => {
      const parent = document.getElementById('link-container')
      const child = document.getElementById('link-' + this.selected.toString())

      if (!parent || !child) { return }

      const parentRect = parent.getBoundingClientRect()
      const parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
      }

      const childRect = child?.getBoundingClientRect()
      const isChildViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height)

      if (!isChildViewable) {
        // scroll by offset relative to parent
        parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top
      }
    }, 250)
  },
  methods: {
    setCurrent (link) {
      this.selected = link.id
      const url = location.origin + this.$route.path
      history.replaceState({}, '', `${url}?selected=${link.id}`)
    }
  }
})
</script>

<style>
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: transparent !important;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    background-color: transparent !important;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    border-radius: 14px;
    background-color: #b4b3b3;
  }
</style>

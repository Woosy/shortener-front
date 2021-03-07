<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow border-b border-gray-300 dark:border-gray-700">
          <!----------------------------------------------->
          <!-- Pagination -->
          <div class="bg-white dark:bg-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <div class="flex-1 flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">
                  Showing
                  <span class="font-medium">
                    {{ ((currentPage * perPage) - perPage) + 1 }}
                  </span>
                  to
                  <span class="font-medium">
                    {{
                      matchingLinks.length > (currentPage * perPage)
                        ? (currentPage * perPage)
                        : matchingLinks.length
                    }}
                  </span>
                  of
                  <span class="font-medium">
                    {{ matchingLinks.length }}
                  </span>
                  results
                </p>
              </div>
              <div class="flex flex-row items-center space-x-2">
                <nav class="relative inline-flex rounded-md shadow-sm -space-x-px text-sm font-medium text-gray-500">
                  <previous-page @previous-page="$emit('previous-page')" />

                  <div v-if="pagesCount <= 5" class="-space-x-px">
                    <span
                      v-for="index in pagesCount"
                      :key="index"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-900"
                      :class="index === currentPage ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'"
                      @click="$emit('change-page', index)"
                    >
                      {{ index }}
                    </span>
                  </div>

                  <div v-if="pagesCount > 5" class="-space-x-px">
                    <span
                      v-for="index in pagesCountSup5"
                      :key="index"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-900"
                      :class="index === currentPage ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'"
                      @click="$emit('change-page', index)"
                    >
                      {{ index }}
                    </span>
                  </div>

                  <next-page @next-page="$emit('next-page')" />
                </nav>

                <div class="text-sm">
                  <base-select
                    :current="perPage"
                    :options="[5, 10, 20, 50]"
                    @toggle="togglePerPage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <!----------------------------------------------->
          <!-- Table header (columns name) -->
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th
                v-for="(col, index) in cols"
                :key="index"
                scope="col"
                class="px-6 py-3"
                :class="index === (cols.length - 1)
                  ? 'relative'
                  : 'text-left text-xs font-medium text-gray-500 uppercase tracking-wider'"
              >
                {{ col }}
              </th>
            </tr>
          </thead>

          <!----------------------------------------------->
          <!-- Table body (columns content) -->
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
            <tr v-for="(link, index) in displayedLinks" :key="index">
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
                  <a :href="`${apiUrl}/${link.key}`" target="_blank">
                    {{ `${apiUrl}/${link.key}` }}
                  </a>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap max-w-md overflow-hidden ">
                <div class="flex space-x-1">
                  <div
                    v-for="(t, i) in link.tags"
                    :key="i"
                    class="flex items-center justify-center px-2 py-1 bg-indigo-500 rounded "
                  >
                    <span class="text-xs text-white whitespace-no-wrap">
                      {{ t.value }}
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
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    cols: {
      type: Array,
      default: () => []
    },
    perPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    matchingLinks: {
      type: Array,
      default: () => []
    },
    displayedLinks: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      apiUrl: process.env.API_URL
    }
  },
  computed: {
    pagesCount (): number {
      let count = Math.trunc(this.matchingLinks.length / this.perPage)
      if ((this.matchingLinks.length % this.perPage) !== 0) { count += 1 }
      return count
    },
    pagesCountSup5 (): Array<number> {
      const count = this.pagesCount
      const current = this.currentPage

      let temp = [] as number[]
      temp.push(current)

      switch (current) {
        case 1:
        case 2:
        case 3:
          temp = [1, 2, 3, 4, 5]
          break
        case count - 2:
        case count - 1:
        case count:
          temp = [count - 4, count - 3, count - 2, count - 1, count]
          break
        default:
          temp = [current - 2, current - 1, current, current + 1, current + 2]
          break
      }

      return temp
    }
  },
  methods: {
    togglePerPage (val) {
      this.$emit('toggle-per-page', val)
    },
    copyLink (link) {
      navigator.clipboard.writeText(`${this.apiUrl}/${link.key}`)
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

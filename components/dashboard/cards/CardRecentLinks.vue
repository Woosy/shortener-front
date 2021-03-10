<template>
  <div class="flex flex-col bg-white dark:bg-gray-800 rounded-lg whitespace-no-wrap">
    <!-- card header -->
    <div class="px-4 xs:px-6 py-5 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-black dark:text-white font-semibold">
        Most recent links
      </h3>
    </div>

    <!-- card body -->
    <div
      v-for="(link, index) in recentLinks"
      :key="index"
      class="px-4 xs:px-6 py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="h-8 w-8">
            <img
              class="h-8 w-8 rounded-full"
              :src="link.user.avatar_url"
              alt="PP"
            >
          </div>

          <div class="px-3 whitespace-nowrap">
            <div class="text-sm mb-1 text-gray-900 dark:text-white">
              {{ link.title }}
            </div>
            <div class="text-sm text-gray-500">
              <a :href="`${apiUrl}/${link.key}`" target="_blank">
                linkkk.to/{{ link.key }}
              </a>
            </div>
          </div>
        </div>

        <p class="text-black dark:text-white text-sm">
          <span class="pr-2">{{ link.clicks.length }}</span>
          <font-awesome-icon icon="mouse" class="text-gray-500 dark:text-gray-600 text-xs" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data () {
    return {
      apiUrl: process.env.API_URL
    }
  },
  computed: {
    ...mapGetters('links', [
      'recentLinks'
    ])
  }
})
</script>

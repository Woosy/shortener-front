<template>
  <div>
    <!-- aze -->
    <base-table :cols="['AUTHOR', 'LINK', 'CREATED_AT', 'CLICKS', '']">
      <tr
        v-for="(link, index) in links"
        :key="index"
      >
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
              <div class="text-sm font-medium text-gray-900">
                {{ link.user.username }}
              </div>
              <div class="text-sm text-gray-500 truncate">
                {{ link.user.email }}
              </div>
            </div>
          </div>
        </td>

        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">
            {{ link.title }}
          </div>
          <div class="text-sm text-gray-500">
            <a :href="`http://127.0.0.1:3333/${link.key}`" target="_blank">
              {{ `http://127.0.0.1:3333/${link.key}` }}
            </a>
          </div>
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ link.created_at }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ link.clicks.length }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" class="text-red-600 hover:text-red-700">Delete</a>
        </td>
      </tr>
    </base-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  computed: {
    ...mapState('links', [
      'links'
    ])
  }
})
</script>

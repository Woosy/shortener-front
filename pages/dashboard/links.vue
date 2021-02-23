<template>
  <div>
    <!---------------------------------->
    <!-- placeholder (aucun lien) -->
    <!---------------------------------->
    <div v-if="links.length === 0">
      <p class="text-gray-600">
        It looks like this workspace doesn't have any links yet.
        You can start creating links by <span class="text-indigo-500 hover:underline cursor-pointer" @click="$store.commit('layout/TOGGLE_CREATE_LINK_MODAL', true)">clicking here</span>.
      </p>
    </div>

    <!---------------------------------->
    <!-- liste des liens -->
    <!---------------------------------->
    <base-table v-if="links.length > 0" :cols="['AUTHOR', 'LINK', 'CREATION DATE', 'CLICKS', '']">
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

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 whitespace-no-wrap">
          {{ $dateFns.format(link.created_at, 'dd-MM-yyyy à HH:hh') }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ link.clicks.length }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <span
            class="text-red-600 hover:text-red-700 cursor-pointer hover:underline"
            @click="deleteLink(link)"
          >
            Delete
          </span>
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
  },
  methods: {
    deleteLink (link) {
      // TODO: modal confirmation
      this.$store.dispatch('links/removeLink', {
        linkId: link.id
      }).then(() => {
        this.$toasted.global.success({ message: 'Link sucessfully deleted.' })
      }).catch((err) => {
        this.$toasted.global.error({ message: err?.response?.data?.errors[0]?.message })
      })
    }
  }
})
</script>

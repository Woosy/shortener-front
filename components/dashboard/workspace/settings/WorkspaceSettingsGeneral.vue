<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Workspace"
      description="Global settings about your workspace."
    />

    <div class="flex items-center justify-between mt-5 pb-5 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
      <div class="text-gray-600 dark:text-gray-500">
        Name
      </div>

      <div class="text-gray-800 dark:text-gray-300 px-2 truncate">
        {{ currentWorkspace.name }}
      </div>

      <div class="text-indigo-400 line-through">
        Update
      </div>
    </div>

    <div
      class="flex items-center justify-between mt-5 font-medium"
      :class="{ 'pb-5 border-b-2 border-gray-300 dark:border-gray-700': isOwner($auth.user.id) }"
    >
      <div class="text-gray-600 dark:text-gray-500">
        Color
      </div>

      <div class="text-gray-800 dark:text-gray-300 px-2 truncate">
        {{ currentWorkspace.color }}
      </div>

      <div class="text-indigo-400 line-through">
        Update
      </div>
    </div>

    <div
      v-if="isOwner($auth.user.id)"
      class="flex items-center justify-between mt-5 font-medium"
    >
      <div class="text-gray-600 dark:text-gray-500">
        Delete workspace
      </div>

      <button
        class="px-2 py-1  transition-all duration-200 rounded-lg focus:outline-none"
        :class="isOwner ? 'bg-red-600 transform hover:scale-105' : 'bg-red-400 cursor-not-allowed'"
        @click="deleteWorkspace()"
      >
        <span class="text-sm text-white">
          Delete workspace
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('workspaces', [
      'currentWorkspace',
      'isOwner'
    ])
  },
  methods: {
    deleteWorkspace () {
      this.$confirm({
        title: 'Are you sure?',
        message: "All links, statistics and members will be gone, forever.<br>There's no coming back.",
        buttons: {
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        callback: (confirm) => {
          if (!confirm) { return }
          const workspaceId = this.currentWorkspace.id

          this.$store.dispatch('workspaces/delete', workspaceId)
            .then(() => {
              this.$toast.global.success({ message: 'Workspace successfully deleted!' })
              if (localStorage.getItem('linkkk.current-workspace-id') === workspaceId) {
                localStorage.removeItem('linkkk.current-workspace-id')
              }
            })
            .catch((err) => {
              this.$toast.global.error({ message: err?.response?.data?.errors[0]?.message })
            })
        }
      })
    }
  }
})
</script>

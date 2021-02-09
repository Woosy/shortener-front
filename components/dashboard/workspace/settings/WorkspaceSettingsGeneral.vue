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

    <div class="flex items-center justify-between mt-5 pb-5 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
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

    <div class="flex items-center justify-between mt-5 font-medium">
      <div class="text-gray-600 dark:text-gray-500">
        Delete workspace
      </div>

      <button class="px-2 py-1 bg-red-500 hover:bg-red-600 transition-all duration-200 rounded-lg focus:outline-none" @click="deleteWorkspace()">
        <span class="text-sm text-white">
          Delete workspace
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('workspaces', {
      // @ts-ignore
      currentWorkspace: state => state.current
    })
  },
  methods: {
    deleteWorkspace () {
      // if user is the owner
      const owner = this.currentWorkspace.members.find(member => member.role === 'owner')
      if (this.$auth.user.id === owner.id) {
        this.$store.commit('layout/TOGGLE_DELETE_WORKSPACE_MODAL', true)
      // if user is just a member
      } else {
        this.$toasted.global.error({ message: 'You are not the owner of this workspace!' })
      }
    }
  }
})
</script>

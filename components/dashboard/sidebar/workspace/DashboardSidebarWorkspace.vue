<template>
  <div class="fixed h-screen w-16 bg-white dark:bg-gray-900">
    <div class="h-full flex flex-col items-center justify-between overflow-y-auto hide-scrollbar">
      <div class="w-full text-center">
        <!-- loop through all workspaces -->
        <dashboard-sidebar-workspace-item
          v-for="(workspace, index) in workspaceList"
          :key="index"
          :name="workspace.name"
          :color="workspace.color"
          :active="workspace.id === current.id"
          @click.native="switchToWorkspace(workspace)"
        />

        <!-- create a workspace -->
        <div
          class="mt-5"
          @click="$store.commit('layout/TOGGLE_CREATE_WORKSPACE_MODAL', true)"
        >
          <button class="h-10 w-10 border border-gray-400 rounded-lg focus:outline-none  transform hover:scale-110 transition duration-150">
            <p class="text-center text-gray-600 text-2xl">
              +
            </p>
          </button>
        </div>
      </div>

      <div class="mt-5">
        <theme-switch />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  fetch () {
    this.$store.dispatch('workspaces/fetchList')

    const currentWorkspaceId = localStorage.getItem('shortener.current-workspace-id')
    if (currentWorkspaceId) {
      this.$store.dispatch('workspaces/fetch', { id: currentWorkspaceId })
    } else {
      this.$store.dispatch('workspaces/fetchPersonal', {})
    }
  },
  data () {
    return {
      showWorkspaceCreateModal: false
    }
  },
  computed: {
    ...mapState('workspaces', [
      'workspaceList',
      'current'
    ])
  },
  methods: {
    switchToWorkspace (workspace) {
      // disable switching to current
      if (this.current.id === workspace.id) { return }

      localStorage.setItem('shortener.current-workspace-id', workspace.id)
      this.$store.dispatch('workspaces/fetch', { id: workspace.id, useDelay: true })
        .then(() => {
          this.$toasted.global.success({ message: `Switching to ${workspace.name}.` })
        })
    }
  }
})
</script>

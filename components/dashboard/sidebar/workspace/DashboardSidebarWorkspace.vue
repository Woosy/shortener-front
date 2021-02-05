<template>
  <div class="fixed h-screen w-16 bg-white dark:bg-gray-900 shadow-xs">
    <div class="h-full flex flex-col items-center justify-between overflow-y-auto hide-scrollbar">
      <div>
        <!-- loop through all workspaces -->
        <dashboard-sidebar-workspace-item
          v-for="(workspace, index) in workspaces"
          :key="index"
          :name="workspace.name"
          :color="workspace.color"
          @click.native="switchToWorkspace(workspace)"
        />

        <!-- create an workspace -->
        <div
          class="mt-5 transform hover:scale-110 transition duration-150"
          @click="$store.commit('layout/TOGGLE_CREATE_WORKSPACE_MODAL', true)"
        >
          <button class="h-10 w-10 border border-gray-400 rounded-lg focus:outline-none">
            <p class="text-center text-gray-600 text-2xl">
              +
            </p>
          </button>
        </div>
      </div>

      <div>
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
    this.$store.dispatch('workspaces/fetch')
  },
  data () {
    return {
      showWorkspaceCreateModal: false
    }
  },
  computed: {
    ...mapState('workspaces', [
      'workspaces'
    ])
  },
  methods: {
    switchToWorkspace (workspace) {
      this.$toasted.global.error({ message: `Switched to ${workspace.name} (not implemented!)` })
    }
  }
})
</script>

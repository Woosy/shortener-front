<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Workspace"
      description="Global settings about your workspace."
    />

    <div class="flex justify-between mt-5 pb-5 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
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

    <div class="flex justify-between mt-5 font-medium">
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
  }
})
</script>

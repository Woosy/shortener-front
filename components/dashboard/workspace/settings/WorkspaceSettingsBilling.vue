<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Billing"
      description="Manage your billing details."
    />

    <alert
      type="info"
      text="Shortener is 100% free of charge While it remains in preview version."
      high-contrast
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('workspaces', {
      // @ts-ignore
      currrentWorkSpace: state => state.current
    })
  }
})
</script>

<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Plan"
      description="Change your plan to unlock more features."
    />

    <alert
      type="info"
      text="Shortener is still in a preview version. Therefore you already have access to all available features."
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

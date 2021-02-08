<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Billing"
      description="Manage your billing details."
    />

    <!--  -->
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

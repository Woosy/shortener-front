<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Team Members"
      description="Manage members of your workspace."
    />

    <!--  -->
    <div
      v-for="(member, index) in currentWorkspace.members"
      :key="index"
    >
      {{ member.username }}
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
      currrentWorkSpace: state => state.current
    })
  }
})
</script>

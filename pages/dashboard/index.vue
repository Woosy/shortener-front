<template>
  <div>
    <!-- ============================================= -->
    <!-- == "small" cards (main statistics) -->
    <!-- ============================================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
      <card-small
        title="CURRENT WORKSPACE"
        icon="home"
        :value="currentWorkspace.name"
        :description="`Created by ${currentWorkspaceOwner.username} | ${currentWorkspace.members.length} member(s)`"
      />

      <card-small
        title="TOTAL LINKS"
        icon="chart-line"
        :value="links.length"
        change="?? new"
        change-type="increase"
        description="The last week"
      />

      <card-small
        title="TOTAL CLICKS"
        icon="mouse"
        :value="clicks.length"
        change="?? %"
        change-type="increase"
        description="The last week"
      />

      <card-recent-links v-if="links.length > 0" />

      <card-active-links v-if="links.length > 0" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  computed: {
    ...mapState('links', [
      'links',
      'clicks'
    ]),
    ...mapGetters('workspaces', [
      'currentWorkspace',
      'currentWorkspaceOwner'
    ])
  }
})
</script>

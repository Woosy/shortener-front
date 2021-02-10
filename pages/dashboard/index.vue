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
        description="Created by Arthur Dufour"
      />

      <card-small
        title="TOTAL LINKS"
        icon="chart-line"
        value="???"
        change="?? new"
        change-type="increase"
        description="The last week"
      />

      <card-small
        title="TOTAL CLICKS"
        icon="mouse"
        value="????"
        change="?? %"
        change-type="increase"
        description="The last week"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  computed: {
    ...mapGetters('workspaces', [
      'currentWorkspace'
    ])
  }
})
</script>

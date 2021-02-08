<template>
  <div>
    <!-- ============================================= -->
    <!-- == "small" cards (main statistics) -->
    <!-- ============================================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
      <card-small
        title="CURRENT WORKSPACE"
        icon="home"
        :value="currrentWorkSpace.name"
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

      <!-- <card-small /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  computed: {
    ...mapState('workspaces', {
      // @ts-ignore
      currrentWorkSpace: state => state.current
    })
  }
})
</script>

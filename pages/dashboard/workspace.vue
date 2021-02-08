<template>
  <div>
    <!-- ============================================= -->
    <!-- == "small" cards (main statistics) -->
    <!-- ============================================= -->
    <div class="hidden sm:grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
      <card-small
        title="MEMBERS"
        icon="users"
        :value="currentMembersCount || '?'"
        detail="/ ?? max"
        description="<u>Upgrade your workspace</u> to get more slots!"
      />

      <card-small />
      <card-small class="hidden 2xl:block" />
      <card-small class="hidden 2xl:block" />
    </div>

    <!-- ============================================= -->
    <!-- == placeholders -->
    <!-- ============================================= -->
    <div class="mt-2 sm:mt-8">
      <settings-nav
        :current="currentTab"
        :options="['General', 'Plan', 'Billing', 'Team Members']"
        @toggle="toggleCurrent"
      />

      <workspace-settings-general v-if="currentTab === 'General'" :key="1" />
      <workspace-settings-plan v-if="currentTab === 'Plan'" :key="2" />
      <workspace-settings-billing v-if="currentTab === 'Billing'" :key="3" />
      <workspace-settings-members v-if="currentTab === 'Team Members'" :key="4" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  data () {
    return {
      currentTab: 'General'
    }
  },
  computed: {
    ...mapGetters({
      currentMembersCount: 'workspaces/currentMembersCount'
    }),
    ...mapState('workspaces', {
      // @ts-ignore
      currentWorkspace: state => state.current
    })
  },
  methods: {
    toggleCurrent (val) {
      this.currentTab = val
    }
  }
})
</script>

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
        :options="['General', 'Team Members', 'Plan', 'Billing' ]"
        @toggle="toggleCurrent"
      />

      <workspace-settings-general v-if="currentTab === 'General'" :key="1" />
      <workspace-settings-members v-if="currentTab === 'Team Members'" :key="2" />
      <workspace-settings-plan v-if="currentTab === 'Plan'" :key="3" />
      <workspace-settings-billing v-if="currentTab === 'Billing'" :key="4" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  middleware: 'user',
  data () {
    return {
      currentTab: 'General'
    }
  },
  computed: {
    ...mapGetters('workspaces', [
      'currentWorkspace',
      'currentMembersCount'
    ])
  },
  methods: {
    toggleCurrent (val) {
      this.currentTab = val
    }
  }
}
</script>

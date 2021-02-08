<template>
  <div>
    <!-- ============================================= -->
    <!-- == "small" cards (main statistics) -->
    <!-- ============================================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
      <card-small
        title="MEMBERS"
        icon="users"
        value="?"
        detail="/ ?? max"
        description="<u>Upgrade your workspace</u> to get more slots!"
      />

      <card-small />
      <card-small />
      <card-small />
    </div>

    <!-- ============================================= -->
    <!-- == placeholders -->
    <!-- ============================================= -->
    <div class="mt-8">
      <settings-nav
        :current="currentTab"
        :options="['General', 'Plan', 'Billing', 'Team Members']"
        @toggle="toggleCurrent"
      />

      <div class="mt-8">
        <div class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-400">
            Workspace
          </h2>
          <p class="text-sm text-gray-600 font-medium">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div class="flex justify-between mt-5 pb-5 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
          <div class="text-gray-600 dark:text-gray-500">
            Name
          </div>

          <div class="text-gray-800 dark:text-gray-300">
            {{ currrentWorkSpace.name }}
          </div>

          <div class="text-indigo-400 line-through">
            Update
          </div>
        </div>

        <div class="flex justify-between mt-5 font-medium">
          <div class="text-gray-600 dark:text-gray-500">
            Color
          </div>

          <div class="text-gray-800 dark:text-gray-300">
            {{ currrentWorkSpace.color }}
          </div>

          <div class="text-indigo-400 line-through">
            Update
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  data () {
    return {
      currentTab: 'General'
    }
  },
  computed: {
    ...mapState('workspaces', {
      // @ts-ignore
      currrentWorkSpace: state => state.current
    })
  },
  methods: {
    toggleCurrent (val) {
      this.currentTab = val
    }
  }
})
</script>

<template>
  <div class="fixed h-screen w-16 bg-white dark:bg-gray-900 shadow-xs">
    <div class="h-full flex flex-col items-center justify-between overflow-y-auto hide-scrollbar">
      <div>
        <!-- loop through all organizations -->
        <dashboard-sidebar-organization-item
          v-for="(organization, index) in organizations"
          :key="index"
          :name="organization.name"
          :color="organization.color"
          @click.native="switchToOrganization(organization)"
        />

        <!-- create an organization -->
        <div class="mt-5 transform hover:scale-110 transition duration-150" @click="showCreateWorkspace()">
          <button class="h-10 w-10 border border-gray-400 rounded-lg focus:outline-none">
            <p class="text-center text-gray-600 text-2xl">
              +
            </p>
          </button>
        </div>
      </div>

      <div>
        <theme-switch />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async fetch () {
    this.organizations = await this.$axios.$get('/user/organizations')
  },
  data () {
    return {
      organizations: []
    }
  },
  methods: {
    switchToOrganization (org) {
      this.$toasted.global.error({ message: `Switched to ${org.name} (not implemented!)` })
    },
    showCreateWorkspace () {
      this.$toasted.global.error({ message: 'Creating new workspace (not implemented!)' })
    }
  }
})
</script>

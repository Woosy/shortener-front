<template>
  <div class="bg-gray-200 dark:bg-gray-900">
    <!--------------------------------------->
    <!-- backdrop -->
    <transition name="fade" :duration="200">
      <div
        v-if="isSidebarMenuOpen"
        class="fixed inset-0 z-20"
        @click="$store.commit('layout/TOGGLE_SIDEBAR_MENU', false)"
      >
        <div class="absolute inset-0 bg-black opacity-75" />
      </div>
    </transition>

    <!--------------------------------------->
    <!-- modals -->
    <div>
      <create-link-modal />
      <delete-workspace-modal />
      <create-workspace-modal />
      <add-member-modal />
    </div>

    <!--------------------------------------->
    <!-- sidebars -->
    <div class="flex flex-row min-h-screen">
      <div
        class="fixed transform transition-all duration-300 lg:translate-x-0 lg:fixed z-30"
        :class="{
          'translate-x-0': isSidebarMenuOpen,
          '-translate-x-80': !isSidebarMenuOpen
        }"
      >
        <dashboard-sidebar-workspace />
        <dashboard-sidebar-menu />
      </div>

      <div class="flex flex-col w-full lg:ml-80">
        <dashboard-header />
        <breadcrumb class="px-5 lg:px-8" />
        <nuxt class="px-5 lg:px-8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import CreateWorkspaceModal from '~/components/theme/modals/CreateWorkspaceModal.vue'

export default Vue.extend({
  components: { CreateWorkspaceModal },
  computed: {
    ...mapState('layout', [
      'isSidebarMenuOpen'
    ])
  }
})
</script>

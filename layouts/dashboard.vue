<template>
  <div class="bg-gray-200 dark:bg-gray-900">
    <!--------------------------------------->
    <!-- backdrop -->
    <transition name="fade" :duration="200">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-20"
        @click="$store.commit('layout/TOGGLE_SIDEBAR_MENU', false)"
      >
        <div class="absolute inset-0 bg-black opacity-75" />
      </div>
    </transition>

    <!--------------------------------------->
    <!-- sidebars -->
    <div class="flex flex-row min-h-screen">
      <div
        class="fixed transform transition-all duration-300 md:translate-x-0 md:fixed z-30"
        :class="{
          'translate-x-0': isOpen,
          '-translate-x-80': !isOpen
        }"
      >
        <dashboard-sidebar-organizations />
        <dashboard-sidebar-menu />
      </div>

      <div class="flex flex-col w-full md:ml-80">
        <dashboard-header />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('layout', {
      isOpen: 'isSidebarMenuOpen'
    })
  }
})
</script>

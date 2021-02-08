<template>
  <div class="px-5 h-16 flex justify-between items-center bg-white dark:bg-gray-800 shadow-xs">
    <!------------------------>
    <!-- left -->
    <div @click="toggleSidebarMenu()">
      <font-awesome-icon icon="bars" class="block lg:hidden text-gray-500" />
    </div>

    <!------------------------>
    <!-- right -->
    <div>
      <!-- avatar -->
      <div class="h-10 w-10 rounded-full bg-gray-300" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    toggleSidebarMenu () {
      this.$store.commit('layout/TOGGLE_SIDEBAR_MENU')
    }
  }
})
</script>

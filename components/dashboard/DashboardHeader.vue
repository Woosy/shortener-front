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
      <img
        :src="$auth.user.avatar_url"
        alt="Avatar"
        class="h-10 w-10 rounded-full"
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSidebarMenu () {
      this.$store.commit('layout/TOGGLE_SIDEBAR_MENU')
    }
  }
}
</script>

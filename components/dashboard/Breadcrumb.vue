<template>
  <div class="h-16 md:h-20 flex justify-between items-center bg-gray-200 dark:bg-gray-900">
    <!------------------------>
    <!-- left -->
    <div class="flex items-center text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300">
      <font-awesome-icon :icon="current().icon" />
      <p class="ml-3">
        {{ current().page }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    current () {
      switch (this.$route.path) {
        case '/dashboard': return { page: 'Dashboard', icon: 'home' }
        case '/dashboard/manage-links': return { page: 'Manage links', icon: 'list' }
        case '/dashboard/links-statistics': return { page: 'Links statistics', icon: 'chart-line' }
        case '/dashboard/workspace': return { page: 'Workspace', icon: 'home' }
        case '/dashboard/account': return { page: 'My profile', icon: 'user' }
        case '/dashboard/account/settings': return { page: 'Profile settings', icon: 'cog' }
      }
    }
  }
}
</script>

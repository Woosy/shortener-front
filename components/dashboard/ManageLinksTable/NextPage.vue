<template>
  <p
    title="Next page"
    class="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-800"
    @click="$emit('next-page')"
  >
    <font-awesome-icon icon="chevron-right" />
  </p>
</template>

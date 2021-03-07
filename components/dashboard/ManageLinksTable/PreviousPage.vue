<template>
  <p
    title="Previous page"
    class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-800"
    @click="$emit('previous-page')"
  >
    <font-awesome-icon icon="chevron-left" />
  </p>
</template>

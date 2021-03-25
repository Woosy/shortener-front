<template>
  <div class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-400">
      {{ title }}
    </h2>
    <p class="text-sm text-gray-600 font-medium">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

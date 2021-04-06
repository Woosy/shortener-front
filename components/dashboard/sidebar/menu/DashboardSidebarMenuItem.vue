<template>
  <div
    class="mt-2 flex items-center text-sm text-white font-semibold py-2 rounded-md transition duration-150"
    :class="isActive() ? 'bg-indigo-400' : 'cursor-pointer hover:bg-gray-200 dark-hover:bg-gray-700'"
    @click="$router.push(to)"
  >
    <!-- item icon -->
    <font-awesome-icon
      :icon="icon"
      class="mx-4"
      :class="isActive() ? 'text-white' : 'text-gray-600 dark:text-white'"
    />

    <p
      class="font-medium"
      :class="isActive() ? 'text-white' : 'text-gray-600 dark:text-white'"
    >
      {{ title }}
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
    icon: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  methods: {
    isActive () {
      return this.$route.path === this.to
    }
  }
}
</script>

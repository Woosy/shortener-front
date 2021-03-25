<template>
  <div class="mb-2 h-16 flex items-center justify-center">
    <div class="relative inline-block w-10 text-center text-lg">
      <font-awesome-icon icon="moon" class="text-gray-600 mb-2" />

      <input
        id="toggle"
        v-model="value"
        type="checkbox"
        name="toggle"
        class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
        @change="$colorMode.preference === 'light'
          ? $colorMode.preference = 'dark'
          : $colorMode.preference = 'light'"
      >
      <label for="toggle" class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300  cursor-pointer" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: this.$colorMode.preference === 'dark'
    }
  }
}
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply right-0;
  right: 0;
  border-color: #68D391;
}
.toggle-checkbox:checked + .toggle-label {
  /* @apply bg-gray-800; */
  @apply bg-green-400;
  background-color: #68D391;
}
</style>

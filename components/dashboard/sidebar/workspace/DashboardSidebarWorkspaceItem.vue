<template>
  <div class="mt-5">
    <button
      class="h-10 w-10 rounded-lg focus:outline-none transform hover:scale-110 transition duration-150"
      :style="`background-color: ${color}`"
    >
      <p class="text-center text-white text-2xl font-semibold">
        {{ name.charAt(0) }}
      </p>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: '?'
    },
    color: {
      type: String,
      default: '#4299e1'
    }
  }
})
</script>

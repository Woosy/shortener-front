<template>
  <div
    class="py-3 my-2 w-full"
    :class="{ 'bg-gray-100 dark:bg-gray-800 rounded-l-lg shadow-xs': active}"
  >
    <button
      class="h-10 w-10 rounded-lg focus:outline-none transform hover:scale-110 transition duration-150"
      :class="{ 'transform scale-110 cursor-default': active }"
      :style="`background-color: ${color}`"
    >
      <div
        v-if="active"
        class="absolute left-0 -ml-3 h-0 w-0"
        :style="`margin-top: 10px; border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 8px solid ${color}`"
      />
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
    },
    active: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <transition name="fade">
    <div class="mt-5 mb-2">
      <div
        class="flex items-center px-4 py-3 rounded-lg"
        :class="{
          'bg-red-100 text-red-600': type === 'error',
          'bg-green-100 text-green-600': type === 'success'
        }"
      >
        <font-awesome-icon
          :icon="
            {
              'exclamation-circle': type === 'error',
              'check-circle': type === 'success',
            }"
        />

        <p class="ml-3 text-sm font-medium">
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'success' // error / success / info
    },
    text: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  }
})
</script>

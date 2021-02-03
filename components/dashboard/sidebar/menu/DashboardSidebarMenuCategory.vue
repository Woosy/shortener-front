<template>
  <div>
    <p class="text-xs text-gray-500 font-semibold">
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

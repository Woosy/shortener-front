<template>
  <div>
    <p class="text-xs text-gray-500 font-semibold">
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
    }
  }
}
</script>

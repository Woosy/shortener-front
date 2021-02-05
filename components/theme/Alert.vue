<template>
  <transition name="fade">
    <div v-if="show" class="mt-5 mb-2">
      <div
        class="flex items-center px-4 py-3 rounded-lg"
        :class="{
          'bg-red-100 text-red-600': type === 'error',
          'bg-green-100 text-green-600': type === 'success',
          'bg-blue-100 text-blue-600': type === 'info'
        }"
      >
        <font-awesome-icon :icon="getIcon()" />

        <p class="px-3 text-sm font-medium">
          {{ text }}
        </p>

        <span v-if="dismissible" class="ml-auto" @click="close()">
          <font-awesome-icon icon="times" />
        </span>
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
      default: 'success',
      validator (value) {
        return ['success', 'error', 'info'].includes(value)
      }
    },
    text: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    getIcon () {
      switch (this.type) {
        case 'error': return 'exclamation-circle'
        case 'success': return 'check-circle'
        case 'info': return 'info-circle'
      }
    },
    close () {
      this.show = false
      this.$emit('close')
    }
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="mt-5 mb-2">
      <div
        class="flex items-center px-4 py-3 rounded-lg bg-ora"
        :class="getTypeClasses()"
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

<script>
export default {
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
    },
    highContrast: {
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
        case 'info': return 'info-circle'
        case 'success': return 'check-circle'
        case 'warning': return 'exclamation-triangle'
        case 'error': return 'exclamation-circle'
      }
    },
    getTypeClasses () {
      if (this.highContrast) {
        switch (this.type) {
          case 'info': return 'bg-blue-200 text-blue-700'
          case 'success': return 'bg-green-200 text-green-700'
          case 'warning': return 'bg-orange-200 text-orange-700'
          case 'error': return 'bg-red-200 text-red-700'
        }
      } else {
        switch (this.type) {
          case 'info': return 'bg-blue-100 text-blue-600'
          case 'success': return 'bg-green-100 text-green-600'
          case 'warning': return 'bg-orange-100 text-orange-600'
          case 'error': return 'bg-red-100 text-red-600'
        }
      }
    },
    close () {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

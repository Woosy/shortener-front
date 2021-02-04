<template>
  <transition name="fade">
    <div
      v-if="showing"
      class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50"
      @click.self="close"
      @keydown.esc="close"
    >
      <!-- modal background -->
      <div class="fixed inset-0" @click="close()">
        <div class="absolute inset-0 bg-black opacity-75" />
      </div>

      <!-- modal content -->
      <div class="sm:w-full sm:max-w-xl bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    showing: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    showing (value) {
      value
        // @ts-ignore
        ? document.querySelector('body').classList.add('overflow-hidden')
        // @ts-ignore
        : document.querySelector('body').classList.remove('overflow-hidden')
    }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) { this.close() }
    })
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
})
</script>

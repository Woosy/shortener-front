<template>
  <div>
    <!------------------------------------------------>
    <!-- DESKTOP VERSION -->
    <!------------------------------------------------>
    <div class="hidden sm:flex font-medium">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="pb-3 border-b-2 whitespace-no-wrap transition duration-300"
        :class="classes(option, index)"
        @click="$emit('toggle', option)"
      >
        {{ option }}
      </div>

      <div class="w-full pb-3 border-b-2 border-gray-300 dark:border-gray-700" />
    </div>

    <!------------------------------------------------>
    <!-- RESPONSIVE VERSION -->
    <!------------------------------------------------>
    <div class="flex sm:hidden">
      <base-select
        :current="current"
        :options="options"
        @toggle="toggleCurrent"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleCurrent (val) {
      this.$emit('toggle', val)
    },
    classes (value, index) {
      let classes = ''

      classes += (value === this.current)
        ? 'text-indigo-500 dark:text-indigo-400 border-indigo-500 dark:border-indigo-400'
        : 'text-gray-600 dark:text-gray-600 border-gray-300 dark:border-gray-700'

      index === 0
        ? classes += ' pr-8'
        : classes += ' px-8'

      return classes
    }
  }
}
</script>

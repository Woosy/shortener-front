<template>
  <div class="h-28 xs:h-32 px-4 xs:px-6 py-5 flex flex-col bg-white dark:bg-gray-800 rounded-lg whitespace-no-wrap">
    <div class="flex w-full">
      <div v-if="icon" class="pr-5 my-auto">
        <div class="px-3 xs:px-4 py-2 xs:py-3 rounded-lg bg-gray-200 dark:bg-gray-700">
          <font-awesome-icon :icon="icon" class="text-gray-500" />
        </div>
      </div>

      <div class="flex flex-col justify-between w-full truncate">
        <!---------------------------->
        <!-- top row -->
        <div class="flex items-start">
          <div class="w-4/5">
            <h3 class="h-full text-xs xs:text-sm font-medium text-gray-600 dark:text-gray-500 truncate">
              {{ title }}
            </h3>
          </div>
        </div>

        <!---------------------------->
        <!-- middle row -->
        <div>
          <h3 class="flex items-center text-lg xs:text-2xl font-bold text-black dark:text-white">
            {{ value }}
            <span class="ml-3 text-gray-500 dark:text-gray-500">
              {{ detail }}
            </span>
          </h3>
        </div>
      </div>
    </div>

    <!---------------------------->
    <!-- bottom row -->
    <div class="mt-3 flex text-xs font-medium">
      <span v-if="change" class="mr-2" :class="getChange().color">
        <font-awesome-icon :icon="getChange().icon" class="mr-1" />
        {{ change }}
      </span>

      <!-- TODO: remove v-html => put a named slot -->
      <span
        class="text-gray-600 dark:text-gray-600 truncate"
        v-html="description"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    detail: {
      type: String,
      default: ''
    },
    change: {
      type: String,
      default: ''
    },
    changeType: {
      type: String,
      default: '',
      validator (value) {
        return ['increase', 'decrease', 'same', ''].includes(value)
      }
    },
    description: {
      type: String,
      default: ''
    }
  },
  methods: {
    getChange () {
      switch (this.changeType) {
        case 'increase': return { icon: 'caret-up', color: 'text-green-400' }
        case 'decrease': return { icon: 'caret-down', color: 'text-red-400' }
        case 'same': return { icon: 'grip-lines', color: 'text-blue-400' }
        default: return ''
      }
    }
  }
})
</script>

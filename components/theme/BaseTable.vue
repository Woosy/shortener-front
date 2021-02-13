<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-300 dark:border-gray-700 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <!----------------------------------------------->
            <!-- Table header (columns name) -->
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th
                  v-for="(col, index) in cols"
                  :key="index"
                  scope="col"
                  class="px-6 py-3"
                  :class="index === (cols.length - 1)
                    ? 'relative'
                    : 'text-left text-xs font-medium text-gray-500 uppercase tracking-wider'"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>

            <!----------------------------------------------->
            <!-- Table body (columns content) -->
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
              <slot />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    cols: {
      type: Array,
      default: () => []
    }
  }
})
</script>

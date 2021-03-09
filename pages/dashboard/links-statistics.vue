<template>
  <div class="flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-8">
    <!------------------------------>
    <!-- "search bar" -->
    <!------------------------------>
    <div
      class="w-full xl:max-w-sm bg-white dark:bg-gray-800 rounded-lg"
    >
      <div class="flex flex-col">
        <!---------------------------->
        <!-- search input -->
        <!---------------------------->
        <div class="p-5 relative text-gray-500 border-b border-gray-200 dark:border-gray-700">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
          >
          <div class="absolute inset-y-0 right-0 flex items-center mr-8">
            <font-awesome-icon :icon="searchQuery ? 'times' : 'search'" @click="searchQuery = ''" />
          </div>
        </div>

        <!---------------------------->
        <!-- links result -->
        <!---------------------------->
        <div
          class="flex flex-col overflow-y-auto custom-scrollbar"
          style="max-height: 625px !important"
        >
          <div
            v-for="(link, index) in links"
            :key="index"
            class="px-5 py-4 flex flex-row justify-between space-x-2"
            :class="{
              'bg-gray-100 dark:bg-gray-700': current.id === link.id,
              'border-b dark:border-gray-700': index !== (links.length - 1)
            }"
            @click="current = link"
          >
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">
                {{ $dateFns.format(link.created_at, '') }}
                MAR 9, 10:47
              </span>
              <h3 class="text-base font-medium text-black dark:text-gray-300">
                {{ link.title }}
              </h3>
              <a
                href=""
                target="_blank"
                class="mt-1 text-sm text-indigo-400 "
              >
                linkkk.to/{{ link.key }}
              </a>
            </div>

            <div class="flex items-end">
              <p class="text-black dark:text-white text-sm">
                <span class="pr-2">{{ link.clicks.length }}</span>
                <font-awesome-icon icon="mouse" class="text-gray-500 dark:text-gray-600 text-xs" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!------------------------------>
    <!-- statistics -->
    <!------------------------------>
    <div class="hidden xl:block p-5 xl:w-full bg-white dark:bg-gray-800 rounded-lg">
      <!--  -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'user',
  layout: 'dashboard',
  data () {
    return {
      searchQuery: '',
      current: {}
    }
  },
  computed: {
    ...mapState('links', [
      'links'
    ])
  }
})
</script>

<style>
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: transparent !important;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    background-color: transparent !important;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    border-radius: 14px;
    background-color: #b4b3b3;
  }
</style>

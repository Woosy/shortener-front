<template>
  <nav class="container px-5 sm:px-10 mx-auto bg-gray-800 mt-4">
    <div class="relative flex items-center justify-between h-16">
      <!---------------------------------------->
      <!-- Mobile menu button-->
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          aria-expanded="false"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <font-awesome-icon v-show="!isMenuOpen" icon="bars" />
          <font-awesome-icon v-show="isMenuOpen" icon="times" />
        </button>
      </div>

      <!---------------------------------------->
      <!-- Menu (desktop) -->
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <img class="hidden sm:block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
          <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <nuxt-link
              v-for="(page, index) in pages"
              :key="index"
              :to="page.path"
              class="px-3 py-2 rounded-md text-sm font-medium"
              :class="isActive(page.path)
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              {{ page.label }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <!---------------------------------------->
      <!-- Right side -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div class="pr-2">
          <nuxt-link to="/sign-in">
            <button class="bg-gray-700 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white focus:outline-none">
              Sign-in
            </button>
          </nuxt-link>
        </div>

        <div class="pl-2">
          <nuxt-link to="/sign-up">
            <button class="bg-gray-700 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white focus:outline-none">
              Sign-up
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!---------------------------------------->
    <!-- Menu (mobile) -->
    <div v-show="isMenuOpen" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <nuxt-link
          v-for="(page, index) in pages"
          :key="index"
          :to="page.path"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="isActive(page.path)
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
        >
          {{ page.label }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      isMenuOpen: false,
      pages: [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'About', path: '/about' }
      ]
    }
  },
  methods: {
    isActive (path: string) {
      return path === this.$route.path
    }
  }
})
</script>

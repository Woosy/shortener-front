<template>
  <div>
    <div class="container px-5 sm:px-10 flex flex-col xl:flex-row justify-center items-center mt-20 sm:mt-32 mx-auto">
      <main>
        <div class="text-center xl:text-left">
          <!----------------------------------->
          <!-- Petit bandeau -->
          <div class="inline-flex flex-row items-center p-1 rounded-full bg-gray-900 text-white ">
            <div class="rounded-full bg-indigo-500 px-3 py-1">
              <p class="text-xs md:text-sm font-medium">
                PREVIEW
              </p>
            </div>
            <div class="px-2">
              <p class="text-xs md:text-sm font-medium">
                Shortener is still in development.
              </p>
            </div>
          </div>

          <!----------------------------------->
          <!-- Main text -->
          <div class="mt-6">
            <h1 class="text-4xl tracking-tighter leading-none font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block text-white flex-no-wrap">A better way to</span>
              <span class="block text-indigo-400">track links.</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>

          <!----------------------------------->
          <!-- Boutons (CTA) -->
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center xl:justify-start">
            <div class="rounded-md shadow">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </div>
          </div>
        </div>
      </main>

      <!----------------------------------->
      <!-- Right side -->
      <div class="mx-4 mt-20 sm:mt-32 xl:mt-0">
        <div class="h-64">
          <div class="hidden md:block absolute">
            <svg class="z-0 -mt-12 ml-16" width="500" height="250" fill="none" viewBox="0 0 500 250">
              <defs><pattern id="svg-pattern-squares-1" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="4" height="4" class="text-gray-700" fill="currentColor" /></pattern></defs>
              <rect width="500" height="250" fill="url(#svg-pattern-squares-1)" />
            </svg>
          </div>

          <div class="z-10 h-40 sm:h-48 md:h-64 rounded-3xl bg-gray-700 transform -rotate-3 -mx-4 " />
        </div>

        <img class="z-10 h-40 sm:h-48 md:h-64 w-auto -mt-64  transform rotate-0" src="@/assets/images/mockup.png" alt="">
      </div>
    </div>

    <div class="bg-white">
      <div class="container px-5 sm:px-10 flex flex-col xl:flex-row justify-center items-center mt-20 sm:mt-32 mx-auto">
        <div class="w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span class="block">Ready to dive in?</span>
            <span class="block text-indigo-600">Start your free trial today.</span>
          </h2>
          <div class="mt-8 lex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get started
              </a>
            </div>
            <div class="ml-3 inline-flex rounded-md shadow">
              <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'landing'
})
</script>

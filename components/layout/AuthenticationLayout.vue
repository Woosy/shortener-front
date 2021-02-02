<template>
  <div class="min-h-screen flex flex-col items-center px-3">
    <!------------------------->
    <!-- Head -->
    <!------------------------->
    <div class="mt-10 mb-10 flex flex-col ">
      <nuxt-link to="/">
        <img class="mx-auto h-12 mb-10 focus:outline-0" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
      </nuxt-link>

      <div>
        <h1 class="text-2xl sm:text-3xl text-white text-center font-bold">
          {{ title }}
        </h1>
      </div>
    </div>

    <!------------------------->
    <!-- "Body" slot -->
    <!------------------------->
    <div class="mb-5 max-w-xl bg-white rounded-lg px-8 py-10 sm:px-10 ">
      <slot name="body" />
    </div>

    <!------------------------->
    <!-- Already have an account -->
    <!------------------------->
    <div class="mb-10">
      <p class="text-xs sm:text-sm text-white">
        <span v-if="type === 'sign-in'">
          Don't have an account? <u><b><nuxt-link to="/sign-up">Sign-up for free!</nuxt-link></b></u>
        </span>

        <span v-if="type === 'sign-up'">
          Already have an account? <u><b><nuxt-link to="/sign-in">Sign-in!</nuxt-link></b></u>
        </span>
      </p>
    </div>

    <!------------------------->
    <!-- Terms -->
    <!------------------------->
    <div class="px-4 pb-4 text-center mt-auto">
      <p class="text-xs sm:text-sm text-gray-600">
        By signing up to Shortener, you agree to our <u><b>terms of service</b></u>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
})
</script>

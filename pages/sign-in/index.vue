<template>
  <authentication-layout
    title="Log in to Shortener"
    type="sign-in"
  >
    <div slot="body">
      <p class="text-sm mb-5">
        Sign-in using one of the following:
      </p>

      <div class="flex flex-col text-sm sm:text-base">
        <button class="text-white bg-gray-900 rounded-lg my-2 py-3 px-10 sm:px-32 focus:outline-none">
          <font-awesome-icon :icon="['fab', 'github']" />
          <span class="ml-1">
            GitHub
          </span>
        </button>

        <button class="text-black bg-gray-200 rounded-lg my-2 py-3 px-10 sm:px-32 focus:outline-none">
          <font-awesome-icon :icon="['fab', 'google']" />
          <span class="ml-1">
            Google
          </span>
        </button>

        <button
          class="text-white bg-indigo-500 rounded-lg my-2 py-3 px-10 sm:px-32 focus:outline-none"
          @click="pushTo('EMAIL')"
        >
          <font-awesome-icon icon="envelope" />
          <span class="ml-1">
            Email
          </span>
        </button>
      </div>
    </div>
  </authentication-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'guest',
  methods: {
    pushTo (method) {
      if (method === 'EMAIL') {
        this.$router.push('/sign-in/email')
      }
    }
  }
})
</script>

<template>
  <authentication-layout
    title="Log in to Linkkk"
    type="sign-in"
  >
    <div slot="body">
      <p class="text-sm mb-4">
        Sign-in using your email and a password :
      </p>

      <form class="flex flex-col text-sm" @submit.prevent="submitLoginForm()">
        <!-- email -->
        <div class="mt-3 relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4">
            <font-awesome-icon icon="envelope" class="text-gray-600" />
          </span>

          <input
            v-model="loginForm.email"
            type="email"
            name="email"
            placeholder="Email"
            required
            class="pl-10 pr-3 py-2 w-full border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- password -->
        <div class="mt-3 relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4">
            <font-awesome-icon icon="lock" class="text-gray-600" />
          </span>

          <input
            v-model="loginForm.password"
            type="password"
            name="password"
            placeholder="Password"
            required
            class="pl-10 pr-3 py-2 w-full border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!--  -->
        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember_me" v-model="loginForm.rememberMe" type="checkbox" class="form-checkbox h-4 w-4 transition duration-150 ease-in-out">
            <label for="remember_me" class="ml-2 block text-sm text-nord2 dark:text-nord6">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <p class="text-indigo-700 hover:underline focus:outline-none focus:underline">
              Forgot your password?
            </p>
          </div>
        </div>

        <button
          class="mt-6 text-white bg-indigo-500 rounded-lg my-2 py-2 px-10 sm:px-32 focus:outline-none"
          type="submit"
        >
          Sign-in
        </button>
      </form>
    </div>
  </authentication-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'guest',
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
        remember_me: false
      }
    }
  },
  methods: {
    submitLoginForm () {
      this.$auth.loginWith('local', { data: this.loginForm })
        .then((res) => {
          this.$toast.global.success({ message: 'Successfully authenticated!' })
          // @ts-ignore
          res.data.needConfiguration
            ? this.$router.push('/sign-in/configuration')
            : this.$router.push('/dashboard')
        })
        .catch((err) => {
          // this.$toast.global.error({ message: 'Authentication failed!' })
          this.$toast.global.error({ message: err?.response?.data?.errors[0]?.message })
        })
    }
  }
})
</script>

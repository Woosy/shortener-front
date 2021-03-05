<template>
  <authentication-layout
    title="Welcome to Linkkk"
    type="sign-up"
  >
    <div slot="body">
      <p class="text-sm mb-4">
        Sign-up using your email and a password :
      </p>

      <validation-observer v-slot="{ passed, handleSubmit }">
        <form class="flex flex-col text-sm sm:text-base" @submit.prevent="handleSubmit(submitRegisterForm)">
          <!------------------------------>
          <!-- email -->
          <!------------------------------>
          <validation-provider
            v-slot="{ invalid, errors }"
            name="email"
            rules="required|email|max:255"
          >
            <div class="mt-3 relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                <font-awesome-icon icon="envelope" class="text-gray-600" />
              </span>

              <input
                v-model="registerForm.email"
                type="email"
                name="email"
                placeholder="Email"
                class="pl-10 pr-3 py-2 w-full border-2 rounded-md border-gray-300 focus:outline-none"
                :class="{
                  'border-red-300': errors[0],
                  'border-green-300': !invalid
                }"
              >
            </div>
            <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
          </validation-provider>

          <!------------------------------>
          <!-- password -->
          <!------------------------------>
          <validation-provider
            v-slot="{ invalid, errors }"
            name="password"
            rules="required|min:8|max:64"
          >
            <div class="mt-3 relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                <font-awesome-icon icon="lock" class="text-gray-600" />
              </span>

              <input
                v-model="registerForm.password"
                type="password"
                name="password"
                placeholder="Password"
                class="pl-10 pr-3 py-2 w-full border-2 rounded-md border-gray-300 focus:outline-none"
                :class="{
                  'border-red-300': errors[0],
                  'border-green-300': !invalid
                }"
              >
            </div>
            <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
          </validation-provider>

          <!------------------------------>
          <!-- submit -->
          <!------------------------------>
          <button
            :disabled="!passed"
            class="mt-6 text-white rounded-lg my-2 py-2 px-10 sm:px-32 focus:outline-none"
            :class="!passed ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 transition duration-150'"
            type="submit"
          >
            Sign-up
          </button>
        </form>
      </validation-observer>
    </div>
  </authentication-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default Vue.extend({
  middleware: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      registerForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitRegisterForm () {
      // post create user
      this.$axios.post('/auth/register', this.registerForm)
        .then(() => {
          this.$toast.global.success({ message: 'Compte créé !' })
          this.$router.push('/sign-in/email')
        })
        .catch((err) => {
          // this.$toast.global.error({ message: 'Authentication failed!' })
          this.$toast.global.error({ message: err?.response?.data?.errors[0]?.message })
        })
    }
  }
})
</script>

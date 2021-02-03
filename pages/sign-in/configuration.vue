<template>
  <authentication-layout title="Account configuration">
    <div slot="body">
      <p class="text-center text-sm mb-4">
        Please complete your profile before<br>accessing your dashboard.
      </p>

      <validation-observer v-slot="{ passed, handleSubmit }">
        <form class="flex flex-col text-sm sm:text-base" @submit.prevent="handleSubmit(submitConfigurationForm)">
          <!------------------------------>
          <!-- username -->
          <!------------------------------>
          <validation-provider
            v-slot="{ invalid, errors }"
            name="username"
            rules="required|max:64"
          >
            <div class="mt-3 relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                <font-awesome-icon icon="user" class="text-gray-600" />
              </span>

              <input
                v-model="configurationForm.username"
                type="text"
                name="username"
                placeholder="Username"
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
            Save
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
  middleware: 'user',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      configurationForm: {
        username: ''
      }
    }
  },
  methods: {
    submitConfigurationForm () {
      // post create user
      this.$axios.post('/auth/configure', this.configurationForm)
        .then(() => {
          this.$toast.global.success({ message: 'Compte validé !' })
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          // this.$toast.global.error({ message: 'Authentication failed!' })
          this.$toast.global.error({ message: err?.response?.data?.errors[0]?.message })
        })
    }
  }
})
</script>

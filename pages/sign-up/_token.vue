<template>
  <authentication-layout
    title="Welcome to Shortener"
  >
    <div slot="body">
      <div class="text-center mb-5">
        <h2 class="text-2xl font-semibold">
          Email validation
        </h2>
      </div>

      <div v-show="loading" class="text-center">
        <p class="text-sm mb-5">
          Validating your email address...
        </p>
        <font-awesome-icon icon="circle-notch" class="fa-spin text-3xl" />
      </div>

      <div v-show="!loading">
        <div
          class="px-4 py-2 text-white rounded-md"
          :class="{ 'bg-green-400': success, 'bg-red-400': error }"
        >
          {{ success || error }}
        </div>
      </div>
    </div>
  </authentication-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'guest',
  data () {
    return {
      loading: true,
      success: '',
      error: ''
    }
  },
  beforeMount () {
    const token = this.$route.params.token
    this.$axios.post('/auth/validate_email', { token })
      .then((res) => {
        this.success = res.data.message
      })
      .catch((err) => {
        this.error = err.response.data?.message || err.response.data.errors[0]?.message
      })
      .finally(() => { this.loading = false })
  }
})
</script>

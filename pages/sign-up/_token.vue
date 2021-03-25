<template>
  <authentication-layout title="Email confirmation">
    <div slot="body">
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

        <div v-show="success" class="mt-5">
          <p class="text-center">
            You can now
            <nuxt-link to="/sign-in" class="underline font-bold">
              sign-in.
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </authentication-layout>
</template>

<script>
export default {
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
}
</script>

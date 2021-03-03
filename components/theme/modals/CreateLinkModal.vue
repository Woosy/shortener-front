<template>
  <modal
    :showing="showCreateLinkModal"
    @close="closeModal()"
  >
    <validation-observer v-slot="{ failed, handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <!----------------------------------------------------->
        <!-- Header -->
        <!----------------------------------------------------->
        <div class="bg-indigo-600 px-4 py-3 sm:px-6">
          <h3 class="text-white uppercase font-medium">
            Create link
          </h3>
        </div>

        <!----------------------------------------------------->
        <!-- Body / form -->
        <!----------------------------------------------------->
        <div class="bg-white p-5 sm:p-6">
          <!--------------------------------------->
          <!-- form -->
          <div class="text-black">
            <!-- link domain -->
            <div class="px-4 py-3 border border-gray-300 rounded">
              <div class="flex justify-between items-center">
                <p class="text-md">
                  short.link
                </p>

                <div class="flex items-center space-x-2">
                  <div class="px-2 bg-gray-200 rounded">
                    <p class="text-sm text-black">
                      Default
                    </p>
                  </div>
                  <font-awesome-icon icon="chevron-down" class="text-xs text-gray-500" />
                </div>
              </div>
            </div>

            <!-- link url -->
            <div class="mt-5">
              <div class="px-4 py-3 border border-indigo-300 rounded bg-indigo-100">
                <p class="text-sm font-medium uppercase mb-2">
                  Paste long URL
                </p>
                <validation-provider
                  v-slot="{ errors }"
                  name="url"
                  rules="required|url|min:5|max:512"
                >
                  <input
                    v-model="form.url"
                    type="text"
                    name="url"
                    placeholder="https://www.example.org/some/very/long/url"
                    class="w-full border-none bg-indigo-100 focus:outline-none"
                    :class="{ 'border-red-300': errors[0] }"
                  >

                  <span v-show="errors[0]" class="inline-block w-auto text-red-500 text-sm mt-2">
                    {{ errors[0] }}.
                  </span>
                </validation-provider>
              </div>
            </div>

            <collapse-transition>
              <div v-if="showMore">
                <hr class="mt-5">

                <!-- title -->
                <div class="mt-5">
                  <div class="px-4 py-3 border border-gray-300 rounded">
                    <p class="text-sm font-medium uppercase mb-2">
                      Title
                    </p>
                    <validation-provider
                      v-slot="{ errors }"
                      name="title"
                      rules="min:1|max:64"
                    >
                      <div class="w-full flex items-center text-base text-center">
                        <input
                          v-model="form.title"
                          type="text"
                          name="totme"
                          placeholder="Untitled"
                          class="w-full border-none focus:outline-none"
                          :class="{ 'border-red-300': errors[0] }"
                        >
                      </div>
                      <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 mt-2">
                        {{ errors[0] }}.
                      </span>
                    </validation-provider>
                  </div>
                </div>

                <!-- key -->
                <div class="mt-5">
                  <div class="px-4 py-3 border border-gray-300 rounded">
                    <p class="text-sm font-medium uppercase mb-2">
                      Customize key
                    </p>
                    <validation-provider
                      v-slot="{ errors }"
                      name="key"
                      rules="min:1|max:512"
                    >
                      <div class="w-full flex items-center text-base text-center">
                        <span class="text-black">
                          http://127.0.0.1:3333/
                        </span>

                        <input
                          v-model="form.key"
                          type="text"
                          name="key"
                          placeholder="custom-key"
                          class="w-full border-none focus:outline-none"
                          :class="{ 'border-red-300': errors[0] }"
                        >
                      </div>
                      <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 mt-2">
                        {{ errors[0] }}.
                      </span>
                    </validation-provider>
                  </div>
                </div>
              </div>
            </collapse-transition>

            <div class="mt-5 text-right">
              <button
                type="button"
                class="text-indigo-500 hover:underline text-xs cursor-pointer focus:outline-none"
                @click="showMore = !showMore"
              >
                {{ showMore ? 'Less' : 'More' }} options
              </button>
            </div>
          </div>

          <!--------------------------------------->
          <!-- alert -->
          <alert
            v-if="error"
            type="error"
            :text="error"
            dismissible
            @close="error = ''"
          />
        </div>

        <!----------------------------------------------------->
        <!-- Bottom (buttons) -->
        <!----------------------------------------------------->
        <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-6"
              @click="closeModal()"
            >
              Cancel
            </button>

            <button
              :disabled="failed || isLoading"
              type="submit"
              class="ml-3 inline-flex justify-center items-center w-full rounded-md px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-6"
              :class="{
                'bg-indigo-300 cursor-not-allowed': failed || isLoading,
                'bg-indigo-500 hover:bg-indigo-600 transition duration-150': !failed && !isLoading
              }"
            >
              <font-awesome-icon v-show="isLoading" icon="circle-notch" class="fa-spin mr-2" />
              Create
            </button>
          </span>
        </div>
      </form>
    </validation-observer>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {},
      showMore: false,
      isLoading: false,
      error: ''
    }
  },
  computed: {
    ...mapState('layout', [
      'showCreateLinkModal'
    ]),
    ...mapGetters('workspaces', [
      'currentWorkspace'
    ])
  },
  methods: {
    closeModal () {
      this.error = ''
      this.form = {}
      this.$store.commit('layout/TOGGLE_CREATE_LINK_MODAL', false)
    },
    submit () {
      this.isLoading = true
      this.$store.dispatch('links/create', { ...this.form, workspaceId: this.currentWorkspace.id })
        .then((link) => {
          this.$toasted.global.success({ message: 'Link successfully created!' })
          this.closeModal()
          setTimeout(() => {
            this.$success({
              title: 'Link successfully created!',
              message: 'Your link has successfully been created.',
              buttons: {
                confirm: 'Copy'
              },
              callback: (confirm) => {
                if (!confirm) { return }

                navigator.clipboard.writeText(`http://127.0.0.1:3333/${link.key}`)
                  .then(() => {
                    this.$toasted.global.success({ message: 'Link copied to clipboard!' })
                  }, () => {
                    this.$toasted.global.error({ message: 'Couldn\'t copy to clipboard!' })
                  })
              }
            })
          }, 200)
        })
        .catch((err) => {
          this.error = err.response.data.code || err.response.data.errors[0].message
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
})
</script>

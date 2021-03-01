<template>
  <modal
    :showing="showCreateLinkModal"
    @close="closeModal()"
  >
    <validation-observer v-slot="{ failed, handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <!----------------------------------------------------->
        <!-- Body / form -->
        <!----------------------------------------------------->
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <font-awesome-icon icon="building" class="text-indigo-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <!--------------------------------------->
              <!-- title -->
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Create a new link
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Fill the following form to obtain a new short URL.<br>
                </p>
              </div>

              <!--------------------------------------->
              <!-- form -->
              <div class="mt-5 text-black text-left">
                <!-- link url -->
                <div class="mt-3">
                  <validation-provider
                    v-slot="{ errors }"
                    name="url"
                    rules="required|url|min:5|max:512"
                  >
                    <label for="url" class="text-sm">
                      Link to shorten :
                    </label>

                    <input
                      v-model="form.url"
                      type="text"
                      name="url"
                      placeholder="Enter a valid URL"
                      class="mt-1 py-2 px-3 text-sm border-2 border-gray-300 rounded-lg w-full focus:outline-none"
                      :class="{ 'border-red-300': errors[0] }"
                    >
                    <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
                  </validation-provider>
                </div>

                <!-- title -->
                <div class="mt-3">
                  <validation-provider
                    v-slot="{ errors }"
                    name="title"
                    rules="min:1|max:64"
                  >
                    <label for="title" class="text-sm">
                      Link title (optional)
                    </label>

                    <input
                      v-model="form.title"
                      type="text"
                      name="title"
                      placeholder="Untitled"
                      class="mt-1 py-2 px-3 text-sm border-2 border-gray-300 rounded-lg w-full focus:outline-none"
                      :class="{ 'border-red-300': errors[0] }"
                    >
                    <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
                  </validation-provider>
                </div>

                <!-- key -->
                <div class="mt-3">
                  <validation-provider
                    v-slot="{ errors }"
                    name="key"
                    rules="min:1|max:512"
                  >
                    <label for="key" class="text-sm">
                      Custom key (optional)
                    </label>

                    <div class="flex items-center w-full text-base">
                      <span class="text-gray-600">
                        http://127.0.0.1:3333/
                      </span>

                      <input
                        v-model="form.key"
                        type="text"
                        name="key"
                        placeholder="custom-key"
                        class="py-2  focus:outline-none"
                        :class="{ 'border-red-300': errors[0] }"
                      >
                    </div>
                    <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
                  </validation-provider>
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
          </div>
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
      isLoading: false,
      error: '',
      form: {}
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
              message: `Your link has successfully been created.<br>You can access it with the following key: ${link.key}`,
              buttons: {
                cancel: 'Close'
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

<template>
  <base-slideover
    :showing="showEditLinkSlideover"
    title="EDIT LINK"
    @close="close()"
  >
    <validation-observer v-slot="{ failed, handleSubmit }">
      <form class="h-full flex flex-col justify-between" @submit.prevent="handleSubmit(submit)">
        <!--------------------------------------->
        <!-- form -->
        <div>
          <div class="text-black dark:text-white">
            <!-- link url -->
            <div class="px-4 py-3 border rounded  border-indigo-300 dark:border-gray-900  bg-indigo-100 dark:bg-gray-700">
              <p class="text-sm font-medium uppercase mb-2">
                URL
              </p>
              <validation-provider
                v-slot="{ errors }"
                name="url"
                rules="required|url|min:5|max:512"
              >
                <input
                  v-model="form.url"
                  disabled
                  type="text"
                  name="url"
                  placeholder="https://www.example.org/some/very/long/url"
                  class="w-full border-none bg-indigo-100 dark:bg-gray-700 focus:outline-none"
                >

                <span v-show="errors[0]" class="inline-block w-auto text-red-500 text-sm mt-2">
                  {{ errors[0] }}.
                </span>
              </validation-provider>
            </div>

            <collapse-transition>
              <div v-if="showMore">
                <hr class="mt-5 h-px border-none bg-gray-300 dark:bg-gray-700">

                <!-- title -->
                <div class="mt-5">
                  <div class="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded">
                    <p class="text-sm font-medium uppercase mb-2">
                      Title
                    </p>
                    <validation-provider
                      v-slot="{ errors }"
                      name="title"
                      rules="min:1|max:64"
                    >
                      <div class="w-full flex items-center text-sm sm:text-base text-center">
                        <input
                          v-model="form.title"
                          type="text"
                          name="totme"
                          placeholder="Untitled"
                          class="w-full border-none dark:bg-gray-800 focus:outline-none"
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
                  <div class="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded">
                    <p class="text-sm font-medium uppercase mb-2">
                      Customize key
                    </p>
                    <validation-provider
                      v-slot="{ errors }"
                      name="key"
                      rules="min:1|max:512"
                    >
                      <div class="w-full flex items-center text-sm sm:text-base text-center">
                        <span class="text-black dark:text-gray-500">
                          {{ apiUrl }}/
                        </span>

                        <input
                          v-model="form.key"
                          type="text"
                          name="key"
                          placeholder="custom-key"
                          class="w-full border-none dark:bg-gray-800 focus:outline-none"
                        >
                      </div>
                      <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 mt-2">
                        {{ errors[0] }}.
                      </span>
                    </validation-provider>
                  </div>
                </div>

                <!-- tags -->
                <div class="mt-5">
                  <div class="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded">
                    <p class="text-sm font-medium uppercase mb-2">
                      TAGS
                    </p>

                    <div class="w-full flex items-center text-sm sm:text-base text-center">
                      <vue-tags-input
                        v-model="tag"
                        :tags="form.tags"
                        :autocomplete-items="filteredTags"
                        @tags-changed="newTags => form.tags = newTags"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </collapse-transition>
          </div>

          <div class="mb-5 text-right">
            <button
              type="button"
              class="text-indigo-500 dark:text-indigo-300 hover:underline text-xs cursor-pointer focus:outline-none"
              @click="showMore = !showMore"
            >
              {{ showMore ? 'Less' : 'More' }} options
            </button>
          </div>
        </div>

        <!--------------------------------------->
        <!-- alert -->
        <base-alert
          v-if="error"
          type="error"
          :text="error"
          dismissible
          @close="error = ''"
        />

        <!----------------------------------------------------->
        <!-- Bottom (buttons) -->
        <!----------------------------------------------------->
        <div class="flex flex-row-reverse pb-5">
          <button
            :disabled="failed || isLoading"
            type="submit"
            class="inline-flex justify-center items-center w-full rounded-md px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-6"
            :class="{
              'bg-indigo-300 cursor-not-allowed': failed || isLoading,
              'bg-indigo-500 hover:bg-indigo-600 transition duration-150': !failed && !isLoading
            }"
          >
            <font-awesome-icon v-show="isLoading" icon="circle-notch" class="fa-spin mr-2" />
            Save
          </button>
        </div>
      </form>
    </validation-observer>
  </base-slideover>
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
      apiUrl: process.env.API_URL,
      form: {},
      showMore: false,
      isLoading: false,
      error: '',
      tag: ''
    }
  },
  computed: {
    ...mapState('layout', [
      'showEditLinkSlideover'
    ]),
    ...mapGetters('workspaces', [
      'currentWorkspace'
    ]),
    ...mapGetters('links', [
      'tagsList'
    ]),
    filteredTags (): any[] {
      return this.tagsList.filter((i) => {
        return i.text.toLowerCase().includes(this.tag.toLowerCase())
      })
    }
  },
  methods: {
    close () {
      this.error = ''
      this.$store.commit('layout/TOGGLE_EDIT_LINK_SLIDEOVER', false)
    },
    submit () {
      this.isLoading = true
      this.$store.dispatch('links/create', { ...this.form, workspaceId: this.currentWorkspace.id })
        .then(() => {
          this.$toasted.global.success({ message: 'Link successfully created!' })
          this.close()
          // setTimeout(() => {
          //   this.$success({
          //     title: 'Link successfully created!',
          //     message: 'Your link has successfully been created.',
          //     buttons: {
          //       confirm: 'Copy'
          //     },
          //     callback: (confirm) => {
          //       if (!confirm) { return }

          //       navigator.clipboard.writeText(`${this.apiUrl}/${link.key}`)
          //         .then(() => {
          //           this.$toasted.global.success({ message: 'Link copied to clipboard!' })
          //         }, () => {
          //           this.$toasted.global.error({ message: 'Couldn\'t copy to clipboard!' })
          //         })
          //     }
          //   })
          // }, 200)
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

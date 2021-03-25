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
            <!---------------------------------------->
            <!-- top part: url & actions ------------->
            <!---------------------------------------->
            <div class="px-4 pb-5 border-b border-gray-300 dark:border-gray-700">
              <div>
                <p class="text-sm font-medium text-indigo-500 dark:text-indigo-200">
                  linkkk.to/<span class="font-semibold">{{ linkToEdit.key }}</span>
                </p>

                <p class="text-xs text-indigo-300 dark:text-indigo-400">
                  {{ linkToEdit.long_url }}
                </p>
              </div>

              <div class="mt-3">
                <span class="text-xs text-indigo-500">
                  <button
                    class="px-2 py-px border border-indigo-500 hover:bg-indigo-500 hover:text-white rounded transition duration-200 focus:outline-none"
                    @click="copyLink(linkToEdit)"
                  >
                    COPY
                  </button>

                  <button
                    class="px-2 py-px border border-indigo-500 hover:bg-indigo-500 hover:text-white rounded transition duration-200 focus:outline-none"
                    @click="deleteLink(linkToEdit.id)"
                  >
                    DELETE
                  </button>
                </span>
              </div>
            </div>

            <!---------------------------------------->
            <!-- body part: title & tags ------------->
            <!---------------------------------------->
            <div>
              <!-- date -->
              <div class="mt-5">
                <p class="text-xs text-gray-500">
                  CREATED {{ $dateFns.format(linkToEdit.created_at, 'MMM d, H:mm').toUpperCase() }}
                </p>
              </div>

              <!-- title -->
              <div class="mt-3">
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
              <!-- <div class="mt-5">
                <div class="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded">
                  <p class="text-sm font-medium uppercase mb-2">
                    TAGS
                  </p>

                  <div class="w-full flex items-center text-sm sm:text-base text-center">
                    <vue-tags-input
                      v-model="tag"
                      :tags="linkToEdit.tags"
                      :autocomplete-items="filteredTags"
                      @tags-changed="newTags => linkToEdit.tags = newTags"
                    />
                  </div>
                </div>
              </div> -->
            </div>
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
        <div class="flex flex-row-reverse pb-5 mt-5">
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
    ...mapState('links', [
      'linkToEdit'
    ]),
    ...mapGetters('links', [
      'tagsList'
    ]),
    ...mapGetters('workspaces', [
      'currentWorkspace'
    ]),
    filteredTags (): any[] {
      return this.tagsList.filter((i) => {
        return i.text.toLowerCase().includes(this.tag.toLowerCase())
      })
    }
  },
  watch: {
    linkToEdit () {
      this.form = { ...this.linkToEdit }
    }
  },
  methods: {
    close () {
      this.error = ''
      this.$store.commit('layout/TOGGLE_EDIT_LINK_SLIDEOVER', false)
    },
    submit () {
      this.isLoading = true
      this.$store.dispatch('links/edit', { ...this.form, workspaceId: this.currentWorkspace.id })
        .then(() => {
          this.$toasted.global.success({ message: 'Link successfully modified!' })
          this.close()
        })
        .catch((err) => {
          this.error = err.response.data.code || err.response.data.errors[0].message
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    copyLink (link) {
      navigator.clipboard.writeText(`${this.apiUrl}/${link.key}`)
        .then(() => {
          this.$toasted.global.success({ message: 'Link copied to clipboard!' })
        }, () => {
          this.$toasted.global.error({ message: 'Couldn\'t copy to clipboard!' })
        })
    },
    deleteLink (linkId: number) {
      this.$confirm({
        title: 'Are you sure?',
        message: 'All clicks associated to this link will also be deleted and removed from your statistics.',
        buttons: {
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        callback: (confirm) => {
          if (!confirm) { return }

          this.$store.dispatch('links/removeLink', linkId)
            .then(() => {
              this.$toasted.global.success({ message: 'Link sucessfully deleted.' })
            }).catch((err) => {
              this.$toasted.global.error({ message: err?.response?.data?.errors[0]?.message })
            })
        }
      })
    }
  }
})
</script>

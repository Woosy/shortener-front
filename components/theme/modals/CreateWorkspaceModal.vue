<template>
  <modal
    :showing="showCreateWorkspaceModal"
    @close="closeModal()"
  >
    <form @submit.prevent="submit()">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <!-- title -->
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <font-awesome-icon icon="building" class="text-indigo-600" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Create a new workspace
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                Workspaces are places built to share your work with others.<br>
              </p>
            </div>

            <!-- form -->
            <div class="mt-5 text-black">
              <input
                v-model="form.name"
                type="text"
                name="workspace-name"
                placeholder="Workspace's name"
                class="py-2 px-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none"
              >
            </div>

            <alert
              v-if="error"
              type="error"
              text="An error has occurred!"
            />
            <!-- <transition name="fade">
              <div v-if="error" class="mt-5 mb-2">
                <div class="flex items-center bg-red-100 px-4 py-3 rounded-lg text-red-600 ">
                  <font-awesome-icon icon="exclamation-circle" />
                  <p class="ml-3 text-sm font-medium">
                    An error has occurred!
                  </p>
                </div>
              </div>
            </transition> -->
          </div>
        </div>
      </div>

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
            type="submit"
            class="ml-3 inline-flex justify-center w-full rounded-md px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-6"
          >
            Create
          </button>
        </span>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data () {
    return {
      form: {
        name: ''
      },
      success: '',
      error: ''
    }
  },
  computed: {
    ...mapState('layout', [
      'showCreateWorkspaceModal'
    ])
  },
  methods: {
    closeModal () {
      this.$store.commit('layout/TOGGLE_CREATE_WORKSPACE_MODAL', false)
    },
    submit () {
      this.error = 'azeaze'
      this.$toasted.global.success({ message: 'Workspace successfully created!' })
    }
  }
})
</script>

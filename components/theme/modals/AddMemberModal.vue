<template>
  <modal
    :showing="showAddMemberModal"
    @close="closeModal()"
  >
    <validation-observer v-slot="{ passed, handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <!----------------------------------------------------->
        <!-- Body / form -->
        <!----------------------------------------------------->
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <font-awesome-icon icon="building" class="text-indigo-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <!--------------------------------------->
              <!-- title -->
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add user to workspace
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Enter the email address of any user to add them to your workspace.<br>
                </p>
              </div>

              <!--------------------------------------->
              <!-- form -->
              <div class="mt-5 text-black">
                <validation-provider
                  v-slot="{ invalid, errors }"
                  name="email"
                  rules="required|email"
                >
                  <input
                    v-model="form.email"
                    type="text"
                    name="email"
                    placeholder="User's email"
                    class="py-2 px-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none"
                    :class="{
                      'border-red-300': errors[0],
                      'border-green-300': !invalid
                    }"
                  >
                  <span v-show="errors[0]" class="inline-block w-auto text-sm text-red-500 ">{{ errors[0] }}.</span>
                </validation-provider>
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
              :disabled="!passed"
              type="submit"
              class="ml-3 inline-flex justify-center w-full rounded-md px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-6"
              :class="!passed ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 transition duration-150'"
            >
              Invite
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
      form: {
        email: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapState('layout', [
      'showAddMemberModal'
    ]),
    ...mapGetters('workspaces', [
      'currentWorkspace'
    ])
  },
  methods: {
    closeModal () {
      this.error = ''
      this.form.email = ''
      this.$store.commit('layout/TOGGLE_ADD_MEMBER_MODAL', false)
    },
    submit () {
      this.$store.dispatch('workspaces/inviteMember', { workspaceId: this.currentWorkspace.id, email: this.form.email })
        .then(() => {
          this.$toasted.global.success({ message: 'User successfully added!' })
          this.closeModal()
        })
        .catch((err) => {
          this.error = err.response.data.code || err.response.data.errors[0].message
        })
    }
  }
})
</script>

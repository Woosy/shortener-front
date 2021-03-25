<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Team Members"
      description="Manage members of your workspace."
    />

    <!--  -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
      <div
        v-for="(member, index) in currentWorkspace.members"
        :key="index"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg"
      >
        <div class="flex flex-col">
          <div class="flex justify-between items-center p-5">
            <!-- left -->
            <div class="flex flex-col truncate">
              <div class="flex mb-1 truncate">
                <!-- username -->
                <span class="dark:text-gray-300 font-medium mr-2 whitespace-no-wrap truncate">
                  {{ member.username }}
                </span>

                <!-- badge -->
                <div class="flex items-center bg-blue-300 px-2 rounded-xl">
                  <span class="text-xs text-white font-medium truncate capitalize">
                    {{ member.role || '???' }}
                  </span>
                </div>
              </div>

              <!-- email -->
              <span class="text-sm text-gray-600 font-medium truncate">
                {{ member.email }}
              </span>
            </div>

            <!-- right -->
            <div class="flex justify-end pl-5 w-20">
              <img
                class="h-10 w-10 rounded-full"
                :src="member.avatar_url"
                alt="PP"
              >
            </div>
          </div>

          <!-- buttons -->
          <button
            v-if="isOwner($auth.user.id)"
            :disabled="isOwner(member.id)"
            :class="isOwner(member.id) ? 'cursor-not-allowed' : ''"
            class="flex items-center justify-center px-5 py-3 border-t dark:border-gray-700 focus:outline-none"
            @click="removeMember(member)"
          >
            <font-awesome-icon icon="user-slash" class="mr-2 text-gray-600" />
            <p class="text-sm text-gray-700 dark:text-white font-medium">
              Remove
            </p>
          </button>
        </div>
      </div>

      <div
        v-if="isOwner($auth.user.id)"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5"
      >
        <div
          class="h-full flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer"
          @click="$store.commit('layout/TOGGLE_ADD_MEMBER_MODAL', true)"
        >
          <p class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark-hover:text-gray-400 transition-all duration-200">
            <font-awesome-icon icon="plus" />
            <span class="ml-3 font-medium">
              Add member
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('workspaces', [
      'currentWorkspace',
      'isOwner'
    ])
  },
  methods: {
    removeMember (member) {
      if (this.isOwner(member.id)) { return }

      this.$confirm({
        title: 'Are you sure?',
        message: `${member.username} will lose access to this workspace.`,
        buttons: {
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        callback: (confirm) => {
          if (!confirm) { return }

          this.$store.dispatch('workspaces/removeMember', {
            workspaceId: this.currentWorkspace.id,
            memberId: member.id
          }).then(() => {
            this.$toasted.global.success({ message: `Sucessfully removed ${member.username} from the workspace!` })
          }).catch((err) => {
            this.$toasted.global.error({ message: err.response.data.errors[0].message })
          })
        }
      })
    }
  }
}
</script>

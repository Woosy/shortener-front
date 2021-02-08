<template>
  <div class="mt-8">
    <workspace-settings-header
      title="Team Members"
      description="Manage members of your workspace."
    />

    <!--  -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
      <div
        v-for="(member, index) in currentWorkSpace.members"
        :key="index"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5"
      >
        <div class="flex justify-between items-center">
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
          <div class="flex justify-center pl-5 w-20">
            <img
              class="object-scale-down h-12 w-12 rounded-full"
              src="https://pbs.twimg.com/profile_images/887661330832003072/Zp6rA_e2_400x400.jpg"
              alt="PP"
            >
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5">
        <div class="h-12 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <p class="text-gray-400 dark:text-gray-500">
            <font-awesome-icon icon="plus" />
            <span class="ml-3 font-medium">
              Invite
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('workspaces', {
      // @ts-ignore
      currentWorkSpace: state => state.current
    })
  }
})
</script>

import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isSidebarMenuOpen: false,
  showCreateWorkspaceModal: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // isSidebarMenuOpen: state => state.isSidebarMenuOpen
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_SIDEBAR_MENU: (state, status) => {
    state.isSidebarMenuOpen = status || !state.isSidebarMenuOpen
  },
  TOGGLE_CREATE_WORKSPACE_MODAL: (state, status) => {
    state.showCreateWorkspaceModal = status || !state.showCreateWorkspaceModal
  }
}

export const actions: ActionTree<RootState, RootState> = {
  // async fetchThings ({ commit }) {
  //   const things = await this.$axios.$get('/things')
  //   console.log(things)
  //   commit('CHANGE_NAME', 'New name')
  // }
}

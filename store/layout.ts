import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isSidebarMenuOpen: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isSidebarMenuOpen: state => state.isSidebarMenuOpen
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_SIDEBAR_MENU: (state, status) => {
    console.log('mutation:', status)
    state.isSidebarMenuOpen = status || !state.isSidebarMenuOpen
  }
}

export const actions: ActionTree<RootState, RootState> = {
  // async fetchThings ({ commit }) {
  //   const things = await this.$axios.$get('/things')
  //   console.log(things)
  //   commit('CHANGE_NAME', 'New name')
  // }
}

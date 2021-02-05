import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  workspaces: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  SET_WORKSPACES: (state, workspaces) => {
    state.workspaces = workspaces
  },
  ADD_WORKSPACE: (state, workspace) => {
    // @ts-ignore
    state.workspaces.push(workspace)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch ({ commit }) {
    const workspaces = await this.$axios.$get('/users/workspaces')
    commit('SET_WORKSPACES', workspaces)
  },

  async create ({ commit }, data) {
    const workspace = await this.$axios.$post('/workspaces', data)
    commit('ADD_WORKSPACE', workspace)
  }
}

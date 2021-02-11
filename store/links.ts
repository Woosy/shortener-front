import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  links: [] as object[],
  clicks: [] as object[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  ADD_LINK: (state, payload) => {
    state.links.push(payload)
  },
  SET_LINKS: (state, payload) => {
    state.links = payload
  },
  SET_CLICKS: (state, payload) => {
    state.clicks = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async create ({ commit }, data) {
    const link = await this.$axios.$post('/links', data)
    commit('ADD_LINK', link)
  }
}

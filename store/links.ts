import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  links: [] as object[],
  clicks: [] as object[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  recentLinks: (state) => {
    return state.links.slice(0, 5)
  },
  activeLinks: (state) => {
    const links = [...state.links]
    links.sort((a: any, b: any) => b.clicks.length - a.clicks.length)
    return links.slice(0, 5)
  }
}

export const mutations: MutationTree<RootState> = {
  ADD_LINK: (state, payload) => {
    state.links.unshift(payload)
  },
  REMOVE_LINK: (state, linkId) => {
    state.links = state.links.filter((link: any) => link.id !== linkId)
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
    return link
  },

  async removeLink ({ commit }, linkId) {
    await this.$axios.$delete(`/links/${linkId}`)
    commit('REMOVE_LINK', linkId)
  }
}

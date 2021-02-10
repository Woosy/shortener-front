import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  workspaceList: [] as object[],
  current: {
    members: []
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  currentWorkspace: state => state.current,
  currentMembersCount: state => state.current.members.length,
  isOwner (state) {
    return (userId: number) => {
      if (state.current.members.length <= 0) { return false }
      const owner: any = state.current.members.find((m: any) => m.role === 'owner')
      return owner.id === userId
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_WORKSPACE_LIST: (state, payload) => {
    state.workspaceList = payload
  },

  SET_CURRENT: (state, payload) => {
    state.current = payload
  },

  ADD_WORKSPACE: (state, workspace: object) => {
    state.workspaceList.push(workspace)
  },

  REMOVE_WORKSPACE: (state, id) => {
    const index = state.workspaceList.findIndex((ws: any) => ws.id === id)
    state.workspaceList.splice(index, 1)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchList ({ commit }) {
    const workspaceList = await this.$axios.$get('/users/workspaces')
    commit('SET_WORKSPACE_LIST', workspaceList)
  },

  async fetch ({ commit }, { id, useDelay = false }) {
    const workspace = await this.$axios.$get(`/workspaces/${id}`)

    if (!useDelay) { return commit('SET_CURRENT', workspace) }
    window.$nuxt.$loading.start()
    setTimeout(() => {
      commit('SET_CURRENT', workspace)
      window.$nuxt.$loading.finish()
    }, 1000)
  },

  async fetchPersonal ({ commit }, { useDelay = false }) {
    const workspace = await this.$axios.$get('/users/workspace')

    if (!useDelay) { return commit('SET_CURRENT', workspace) }
    window.$nuxt.$loading.start()
    setTimeout(() => {
      commit('SET_CURRENT', workspace)
      window.$nuxt.$loading.finish()
    }, 1000)
  },

  async create ({ commit }, data) {
    const workspace = await this.$axios.$post('/workspaces', data)
    commit('ADD_WORKSPACE', workspace)
    commit('SET_CURRENT', workspace)
  },

  async delete ({ commit, dispatch }, id) {
    await this.$axios.$delete(`/workspaces/${id}`)
    commit('REMOVE_WORKSPACE', id)
    dispatch('fetchPersonal', {})
  },

  async inviteMember ({ commit }, { workspaceId, email }) {
    const workspace = await this.$axios.$post(`/workspaces/${workspaceId}/members`, { email })
    commit('SET_CURRENT', workspace)
  },

  async removeMember ({ commit }, { workspaceId, memberId }) {
    const workspace = await this.$axios.$delete(`/workspaces/${workspaceId}/members/${memberId}`)
    commit('SET_CURRENT', workspace)
  }
}

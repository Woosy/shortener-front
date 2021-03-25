const workspacesModule = {
  // ----------------------------------------
  // -- state
  // ----------------------------------------
  state: () => ({
    workspaceList: [],
    current: {
      members: []
    }
  }),

  // ----------------------------------------
  // -- getters
  // ----------------------------------------
  getters: {
    currentWorkspace: state => state.current,
    currentWorkspaceOwner: (state) => {
      return state.current.members.find(m => m.role === 'owner') || '??'
    },
    currentMembersCount: state => state.current.members.length,
    isOwner: (state) => {
      return (userId) => {
        if (state.current.members.length <= 0) { return false }
        const owner = state.current.members.find(m => m.role === 'owner')
        return owner.id === userId
      }
    }
  },

  // ----------------------------------------
  // -- mutations
  // ----------------------------------------
  mutations: {
    SET_WORKSPACE_LIST: (state, payload) => {
      state.workspaceList = payload
    },

    SET_CURRENT: (state, payload) => {
      state.current = payload
    },

    ADD_WORKSPACE: (state, workspace) => {
      state.workspaceList.push(workspace)
    },

    REMOVE_WORKSPACE: (state, id) => {
      const index = state.workspaceList.findIndex(ws => ws.id === id)
      state.workspaceList.splice(index, 1)
    }
  },

  // ----------------------------------------
  // -- actions
  // ----------------------------------------
  actions: {
    async fetchList ({ commit }) {
      const workspaceList = await this.$axios.$get('/users/workspaces')
      commit('SET_WORKSPACE_LIST', workspaceList)
    },

    async fetch ({ commit }, { id, useDelay = false }) {
      const workspace = await this.$axios.$get(`/workspaces/${id}`)

      if (!useDelay) {
        commit('SET_CURRENT', workspace)
        commit('links/SET_LINKS', workspace.links, { root: true })
        commit('links/SET_CLICKS', workspace.clicks, { root: true })
        return
      }

      window.$nuxt.$loading.start()
      setTimeout(() => {
        commit('SET_CURRENT', workspace)
        commit('links/SET_LINKS', workspace.links, { root: true })
        commit('links/SET_CLICKS', workspace.clicks, { root: true })
        window.$nuxt.$loading.finish()
      }, 1000)
    },

    async fetchPersonal ({ commit }, { useDelay = false }) {
      const workspace = await this.$axios.$get('/users/workspace')

      if (!useDelay) {
        commit('SET_CURRENT', workspace)
        commit('links/SET_LINKS', workspace.links, { root: true })
        commit('links/SET_CLICKS', workspace.clicks, { root: true })
        return
      }

      window.$nuxt.$loading.start()
      setTimeout(() => {
        commit('SET_CURRENT', workspace)
        commit('links/SET_LINKS', workspace.links, { root: true })
        commit('links/SET_CLICKS', workspace.clicks, { root: true })
        window.$nuxt.$loading.finish()
      }, 1000)
    },

    async create ({ commit }, data) {
      const workspace = await this.$axios.$post('/workspaces', data)
      commit('ADD_WORKSPACE', workspace)
      commit('links/SET_LINKS', [], { root: true })
      commit('links/SET_CLICKS', [], { root: true })
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
}

export default workspacesModule

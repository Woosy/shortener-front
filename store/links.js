const linksModule = {
  state: () => ({
    links: [],
    clicks: [],
    linkToEdit: {}
  }),

  getters: {
    recentLinks: (state) => {
      return state.links.slice(0, 5)
    },
    activeLinks: (state) => {
      const links = [...state.links]
      links.sort((a, b) => b.clicks.length - a.clicks.length)
      return links.slice(0, 5)
    },
    tagsList: (state) => {
      const result = []
      const links = [...state.links]
      links.forEach((link) => {
        link.tags.forEach((tag) => {
          if (result.some(val => val.text === tag.value)) { return }
          result.push({ text: tag.value })
        })
      })

      return result
    }
  },

  mutations: {
    ADD_LINK: (state, payload) => {
      state.links.unshift(payload)
    },
    REMOVE_LINK: (state, linkId) => {
      state.links = state.links.filter(link => link.id !== linkId)
    },
    EDIT_LINK: (state, link) => {
      const index = state.links.findIndex(e => e.id === link.id)
      state.links[index] = link
    },
    SET_LINKS: (state, payload) => {
      state.links = payload
    },
    SET_CLICKS: (state, payload) => {
      state.clicks = payload
    },
    SET_LINK_TO_EDIT: (state, link) => {
      state.linkToEdit = link
    }
  },

  actions: {
    async create ({ commit }, data) {
      const link = await this.$axios.$post('/links', data)
      commit('ADD_LINK', link)
      return link
    },

    async removeLink ({ commit }, linkId) {
      await this.$axios.$delete(`/links/${linkId}`)
      commit('REMOVE_LINK', linkId)
    },

    async edit ({ commit }, data) {
      const link = await this.$axios.$put('/links', data)
      commit('EDIT_LINK', link)
    }
  }
}

export default linksModule

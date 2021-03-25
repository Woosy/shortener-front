const layoutModule = {
  state: () => ({
    isSidebarMenuOpen: false,
    showCreateWorkspaceModal: false,
    showAddMemberModal: false,
    showCreateLinkSlideover: false,
    showEditLinkSlideover: false
  }),

  mutations: {
    TOGGLE_SIDEBAR_MENU: (state, status) => {
      state.isSidebarMenuOpen = status !== undefined ? status : !state.isSidebarMenuOpen
    },
    TOGGLE_CREATE_WORKSPACE_MODAL: (state, status) => {
      state.showCreateWorkspaceModal = status !== undefined ? status : !state.showCreateWorkspaceModal
    },
    TOGGLE_ADD_MEMBER_MODAL: (state, status) => {
      state.showAddMemberModal = status !== undefined ? status : !state.showAddMemberModal
    },
    TOGGLE_CREATE_LINK_SLIDEOVER: (state, status) => {
      state.showCreateLinkSlideover = status !== undefined ? status : !state.showCreateLinkSlideover
    },
    TOGGLE_EDIT_LINK_SLIDEOVER: (state, status) => {
      state.showEditLinkSlideover = status !== undefined ? status : !state.showEditLinkSlideover
    }
  }
}

export default layoutModule

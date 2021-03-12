import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isSidebarMenuOpen: false,
  showCreateWorkspaceModal: false,
  showAddMemberModal: false,
  showCreateLinkSlideover: false,
  showEditLinkSlideover: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // isSidebarMenuOpen: state => state.isSidebarMenuOpen
}

export const mutations: MutationTree<RootState> = {
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

export const actions: ActionTree<RootState, RootState> = {
}

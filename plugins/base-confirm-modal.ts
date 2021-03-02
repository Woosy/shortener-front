import Vue from 'vue'
// @ts-ignore
import BaseConfirmModal from '../components/theme/modals/confirm/BaseConfirmModal.vue'
import { baseConfirmModalEvents } from '../components/theme/modals/confirm/baseConfirmModalEvents.js'

declare module 'vue/types/vue' {
  interface Vue {
    $confirm(params: any): void
  }
}

export default (_, inject) => {
  Vue.component('base-confirm-modal', BaseConfirmModal)

  const confirm = (params) => {
    baseConfirmModalEvents.$emit('open', params)
  }

  confirm.close = () => {
    baseConfirmModalEvents.$emit('close')
  }

  inject('confirm', params => confirm(params))
}

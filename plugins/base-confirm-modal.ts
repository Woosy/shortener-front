import Vue from 'vue'
// @ts-ignore
import BaseConfirmModal from '../components/theme/modals/confirm/BaseConfirmModal.vue'
import { events } from '../components/theme/modals/confirm/events.js'

declare module 'vue/types/vue' {
  interface Vue {
    $confirm(params: any): void
  }
}

export default (_, inject) => {
  Vue.component('base-confirm-modal', BaseConfirmModal)

  const confirm = (params) => {
    events.$emit('open', params)
  }

  confirm.close = () => {
    events.$emit('close')
  }

  inject('confirm', params => confirm(params))
}

import Vue from 'vue'
// @ts-ignore
import BaseSuccessModal from '../components/theme/modals/success/BaseSuccessModal.vue'
import { events } from '../components/theme/modals/success/events.js'

declare module 'vue/types/vue' {
  interface Vue {
    $success(params: any): void
  }
}

export default (_, inject) => {
  Vue.component('base-success-modal', BaseSuccessModal)

  const confirm = (params) => {
    events.$emit('open', params)
  }

  confirm.close = () => {
    events.$emit('close')
  }

  inject('success', params => confirm(params))
}

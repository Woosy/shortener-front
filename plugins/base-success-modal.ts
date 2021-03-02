import Vue from 'vue'
// @ts-ignore
import BaseSuccessModal from '../components/theme/modals/success/BaseSuccessModal.vue'
import { baseSuccessModalEvents } from '../components/theme/modals/success/baseSuccessModalEvents.js'

declare module 'vue/types/vue' {
  interface Vue {
    $success(params: any): void
  }
}

export default (_, inject) => {
  Vue.component('base-success-modal', BaseSuccessModal)

  const confirm = (params) => {
    baseSuccessModalEvents.$emit('open', params)
  }

  confirm.close = () => {
    baseSuccessModalEvents.$emit('close')
  }

  inject('success', params => confirm(params))
}

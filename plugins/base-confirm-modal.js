import Vue from 'vue'
import BaseConfirmModal from '../components/theme/modals/confirm/BaseConfirmModal.vue'
import { baseConfirmModalEvents } from '../components/theme/modals/confirm/baseConfirmModalEvents.js'

export default (_, inject) => {
  Vue.component('BaseConfirmModal', BaseConfirmModal)

  const confirm = (params) => {
    baseConfirmModalEvents.$emit('open', params)
  }

  confirm.close = () => {
    baseConfirmModalEvents.$emit('close')
  }

  inject('confirm', params => confirm(params))
}

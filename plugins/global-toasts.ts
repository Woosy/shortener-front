import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

// TODO: i18n
export default () => {
// export default ({ app }) => {
  // const i18n = app.i18n

  // Success toast
  Vue.toasted.register('success', (payload) => {
    return payload.message
      ? payload.message
      : 'Success'
      // : i18n.t('toast.success')
  }, {
    type: 'success',
    duration: 5000
  })

  // Error toast
  Vue.toasted.register('error', (payload) => {
    return payload.message
      ? payload.message
      : 'Error'
    // : i18n.t('toast.error')
  }, {
    type: 'error',
    duration: 5000
  })
}

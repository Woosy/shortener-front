<template>
  <modal
    id="baseConfirmModal"
    ref="baseConfirmModalRef"
    :showing="show"
    @close="show = false"
  >
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
          <font-awesome-icon icon="exclamation-triangle" class="text-red-600" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ dialog.title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500" v-html="dialog.message" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button
        v-if="dialog.buttons.confirm"
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click.stop="e => handleClickButton(e, true)"
      >
        {{ dialog.buttons.confirm }}
      </button>

      <button
        v-if="dialog.buttons.cancel"
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click.stop="e => handleClickButton(e, false)"
      >
        {{ dialog.buttons.cancel }}
      </button>
    </div>
  </modal>
</template>

<script>
import { baseConfirmModalEvents } from './baseConfirmModalEvents'

export default {
  data () {
    return {
      show: false,
      dialog: {
        title: '',
        message: '',
        buttons: {}
      },
      params: {}
    }
  },
  mounted () {
    if (!document) { return }
    baseConfirmModalEvents.$on('open', this.open)
    baseConfirmModalEvents.$on('close', () => {
      this.handleClickOverlay({ target: { id: 'baseConfirmModal' } })
    })
  },
  methods: {
    resetState () {
      this.dialog = {
        title: '',
        message: '',
        buttons: {},
        callback: () => {}
      }
    },
    handleClickButton ({ target }, confirm) {
      if (target.id === 'baseConfirmModal') { return }
      this.show = false

      if (this.params.callback) {
        this.params.callback(confirm)
      }
    },
    handleClickOverlay ({ target }) {
      if (target.id === 'baseConfirmModal') {
        this.show = false

        if (this.params.callback) {
          this.params.callback(false)
        }
      }
    },
    open (params) {
      this.resetState()
      this.params = params
      this.show = true

      // set params to dialog state
      Object.entries(params).forEach((param) => {
        if (typeof param[1] === typeof this.dialog[param[0]]) {
          this.dialog[param[0]] = param[1]
        }
      })
    }
  }
}
</script>

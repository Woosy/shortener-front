export default {
  data () {
    return {
      apiUrl: process.env.API_URL
    }
  },
  methods: {
    copyLink (link) {
      navigator.clipboard.writeText(`${this.apiUrl}/${link.key}`)
        .then(() => {
          this.$toasted.global.success({ message: 'Link copied to clipboard!' })
        }, () => {
          this.$toasted.global.error({ message: 'Couldn\'t copy to clipboard!' })
        })
    },
    deleteLink (linkId) {
      this.$confirm({
        title: 'Are you sure?',
        message: 'All clicks associated to this link will also be deleted and removed from your statistics.',
        buttons: {
          confirm: 'Confirm',
          cancel: 'Cancel'
        },
        callback: (confirm) => {
          if (!confirm) { return }

          this.$store.dispatch('links/removeLink', linkId)
            .then(() => {
              this.$toasted.global.success({ message: 'Link sucessfully deleted.' })
            }).catch((err) => {
              this.$toasted.global.error({ message: err.response.data.errors[0].message })
            })
        }
      })
    }
  }
}

import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

// TODO: i18n ?
import { messages } from 'vee-validate/dist/locale/en.json'

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

extend('url', {
  validate (value) {
    if (value) {
      const regex = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm)
      return regex.test(value)
    }

    return false
  },
  message: 'This value must be a valid URL'
})

import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

// TODO: i18n ?
import { messages } from 'vee-validate/dist/locale/en.json'

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

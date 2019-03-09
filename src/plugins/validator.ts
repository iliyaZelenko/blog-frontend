import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { rules, validator, validatorSwitchLocale } from '~/tools/validator'
import dictionary from '~/i18n/validator'

// vee-validate already have $validator
const $formValidator = {
  rules,
  async validate (data) {
    return this.validator.validateAll(data)
  },
  validator
}

export default ({ app }, inject) => {
  const currentLocale = app.i18n.locale

  validatorSwitchLocale(currentLocale)

  Vue.use(VeeValidate, {
    locale: currentLocale,
    dictionary
  })

  inject('formValidator', $formValidator)
}

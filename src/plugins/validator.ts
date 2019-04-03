import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { rules, validator, validatorSwitchLocale } from '~/tools/validator'
import dictionary from '~/i18n/validator'

// vee-validate already have $validator
const $formValidator = {
  rules,
  // async validate (data) {
  //   return this.validator.validateAll(data)
  // },
  // async validateFields () {
  //   return this.validator.validateAll()
  // },
  validator,
  errors: validator.errors
}

export default ({ app }, inject) => {
  const currentLocale = app.i18n.locale

  validatorSwitchLocale(currentLocale)

  Vue.use(VeeValidate, {
    // TODO !!! Поставать на false чтобы не инджектить в каждый компонент, оно не везде надо.
    // Также в самой доке по vee-validate писалось что для Nuxt нужно ставить false, иначе будет проблема с памятью
    // inject: false,
    locale: currentLocale,
    dictionary
  })

  // TODO убрать везде
  inject('formValidator', $formValidator)
}

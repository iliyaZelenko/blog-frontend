import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import { validatorSwitchLocale } from '~/tools/validator'

export default ({ app }) => {
  // https://github.com/nuxt-community/nuxt-i18n/blob/master/docs/callbacks.md#usage
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    validatorSwitchLocale(newLocale)
    // @ts-ignore
    Vue.prototype.$vuetify.lang.current = newLocale
  }
}

//
// import messages from '~/i18n/messages'
// import { getShortLocale, getFallbackLocale } from '~/tools/helpers'
//
// const locale = getShortLocale()
// const fallbackLocale = getFallbackLocale()
//
// Vue.use(VueI18n)
//
// /*
// function loadLocaleMessages () {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }
// */
//
// export default ({ app, store }, inject) => {
//   const plugin = new VueI18n({
//     locale,
//     fallbackLocale,
//     messages
//   })
//
//   inject('i18n', plugin)
//
//   // https://github.com/nuxt-community/nuxt-i18n/blob/master/docs/callbacks.md#usage
//   app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
//     validatorSwitchLocale(newLocale)
//   }
// }

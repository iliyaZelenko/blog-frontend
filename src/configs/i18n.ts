// import { join } from 'path' , I18N_DIR
import { join } from 'path'

const { LOCALES, DEFAULT_LOCALE, BASE_URL, FALLBACK_LOCALE, I18N_DIR } = global.appEnv
let i18nMessages

try {
  i18nMessages = require(`~/i18n/messages`).default
} catch (e) {
  i18nMessages = require(`${join(I18N_DIR, 'messages')}`).default
}
// const i18nMessages = require(`~/i18n/messages.js`).default
// const i18nMessages = require(`${join(I18N_DIR, 'messages')}`).default

export const locales = LOCALES
export const defaultLocale = DEFAULT_LOCALE
export const seo = false
export const parsePages = false // отключает acorn
// TODO вынести в другой конфиг
export const baseUrl = BASE_URL
export const strategy = 'prefix_except_default'
export const vueI18n = {
  fallbackLocale: FALLBACK_LOCALE,
  messages: i18nMessages
}
export const vuetifyLocales = {
  en: require('vuetify/es5/locale/en').default,
  ru: require('vuetify/es5/locale/ru').default,
  uk: require('vuetify/es5/locale/uk').default
}

// import { join } from 'path'
// const { SRC_DIR } = global.appEnv
//
// const i18n = require(join(SRC_DIR, 'configs/i18n.ts'))

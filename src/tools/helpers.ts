import Vue from 'vue'

// type Locale = {name: string}

export const vp = Vue.prototype

// show error for server or client
// export function showErrorUniversal (error, context: any = null) {
//   if (process.server && context) {
//     const { app } = context
//
//     app.$cookies.set('showMessagesInBrowser', error)
//   } else {
//     vp.$notify.error(error)
//   }
// }

// primary subtag + optional subtag
// export function getFullLocale (): string {
//   return getLocale()
// }
//
// // только primary subtag
// export function getShortLocale (): string {
//   return getFullLocale().slice(0, 2)
// }
//
// export function getFallbackLocale (): Locale {
//   return getLocales().filter((i: any) => i.fallback)[0]
// }
//
// export function getMainLocale (): Locale {
//   return getLocales().filter((i: any) => i.main)[0]
// }
//
// export function getLocales (): Locale[] {
//   // @ts-ignore
//   return process.env.LOCALES
// }
//
// // export function setLocale (locale) {
// //   // Cookie.set('locale', locale)
// // }
//
// function getLocale (): string {
//   let locale = getLocaleValue(getMainLocale()) || getLocaleValue(getFallbackLocale())
//
//   if (locale) {
//     return locale
//   }
//
//   let locales = getLocales()
//
//   if (locales.length) {
//     return getLocaleValue(locales[0])
//   }
//
//   return 'en-US'
// }
//
// function getLocaleValue (locale: Locale): string {
//   return locale.name
// }

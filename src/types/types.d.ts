// 1. Make sure to import 'vue' before declaring augmented types
import Vue, { ComponentOptions } from 'vue'
import { NuxtCookies } from 'cookie-universal-nuxt'
import VueRouter, { RawLocation } from 'vue-router'
// import 'vue-i18n'
// import VueI18n, { IVueI18n } from 'vue-i18n'
// import 'vue-router'
// import 'nuxt-i18n'

import { ApolloProperty } from 'vue-apollo/types/vue-apollo'
import { ApolloClient } from 'apollo-client'
// import { VuetifyObject } 'vuetify'
// import './nuxt'

declare global {
  namespace App {
    interface EnvInterface {
      SRC_DIR: string
      STYLES_DIR: string
      CONFIGS_DIR: string
      PAGES_EXTENDED_DIR: string
      PLUGINS_DIR: string
      I18N_DIR: string

      /* URL */
      BASE_URL: string
      BASE_API_URL: string
      FULL_API_URL: string
      FULL_API_GRAPHQL_URL: string

      /* Locales */
      DEFAULT_LOCALE: string
      FALLBACK_LOCALE: string
      LOCALES: any[]
      NUXT_HOST: string
      NUXT_PORT: string
      BROWSERS_SUPPORT: any[]
      NODE_SUPPORT: string
    }
  }

  namespace NodeJS {
    interface Process {
      browser: boolean
      server: boolean
    }
    interface Global {
      appEnv: App.EnvInterface
      _$app: any
      // spotConfig: any
    }
  }

  interface Window {
    onNuxtReady: any
    $nuxt: any
    _$app: any
  }
}

// declare namespace NuxtVueI18n {
//   type Locale = VueI18n.Locale
//
//   namespace Options {
//     // e.g.:
//     // [
//     //   { code: 'en', iso: 'en-US', file: 'en.js' },
//     //   { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
//     //   { code: 'es', iso: 'es-ES', file: 'es.js' }
//     // ]
//     interface LocaleObject {
//       code: Locale
//       // can be undefined: https://goo.gl/cCGKUV
//       iso?: string
//       // can be undefined: https://goo.gl/ryc5pF
//       file?: string
//       // Allow custom properties, e.g. "name": https://goo.gl/wrcb2G
//       [key: string]: any
//     }
//
//     interface DetectBrowserLanguageInterface {
//       useCookie: boolean
//       cookieKey: string
//       alwaysRedirect: boolean
//       fallbackLocale: Locale | null
//     }
//
//     interface Vuex {
//       moduleName: string
//       mutations: {
//         setLocale: string
//         setMessages: string
//       }
//       preserveState: boolean
//     }
//
//     // special options for a "app.i18n" property: https://goo.gl/UwNfZo
//     interface VueI18nInterface {
//       locales: Array<Locale | LocaleObject>
//       defaultLocale: null | Locale
//       differentDomains: boolean
//       forwardedHost: boolean
//       routesNameSeparator: string
//       beforeLanguageSwitch: () => any
//       onLanguageSwitched: () => any
//     }
//
//     // see options reference: https://github.com/nuxt-community/nuxt-i18n/blob/master/docs/options-reference.md
//     interface AllOptionsInterface extends VueI18nInterface {
//       vueI18n: VueI18n.I18nOptions
//       strategy: 'prefix_except_default' | 'prefix' | 'prefix_and_default'
//       lazy: boolean
//       langDir: string | null
//       rootRedirect: string | null
//       detectBrowserLanguage: Options.DetectBrowserLanguageInterface
//       seo: false
//       baseUrl: string
//       vuex: Options.Vuex
//       parsePages: boolean
//       // see https://goo.gl/NbzX3f
//       pages: {
//         [key: string]: boolean | {
//           [key: string]: boolean | string
//         }
//       }
//       encodePaths: boolean
//     }
//   }
// }

// пример как можно расширять типы пакетов
// declare module 'vue-i18n' {
//   // the VueI18n class expands here: https://goo.gl/Xtp9EG
//   interface IVueI18n extends NuxtVueI18n.Options.VueI18nInterface {
//
//   }
//
//   // namespace VueI18n {
//   //   interface SpecificDateTimeFormatOptions {
//   //
//   //   }
//   // }
// }

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $date: (date: string | Date) => any
    $breakpoint: any
    switchLocalePath: any
    $apollo: ApolloProperty<any> // ApolloClient<{}> // ApolloProperty<any>
    // $vuetify: VuetifyObject,
    $router: VueRouter, // без этого не вызывает ошибку, но IDE подсвечивает крассным
    $cookies: NuxtCookies
    $auth: any
    $formValidator: any
    $notify: any
    localePath (route: RawLocation, locale?: string): string
    $actionWithLoading (action: string, loadingVariable: string, ...arg: any)
    // locale
    // readonly $i18n: VueI18n & IVueI18n
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // for my globalRouteMeta middleware
    meta?: {
      [key: string]: any
    }
  }
}

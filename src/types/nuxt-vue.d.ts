import Vue, { ComponentOptions } from 'vue'
import { Route } from 'vue-router'
import { MetaInfo } from 'vue-meta'
import { Context, Middleware, Transition, LoadingObject } from './nuxt'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    head?: MetaInfo | (() => MetaInfo)
    key?: string | ((to: Route) => string)
    layout?: string | ((ctx: Context) => string)
    middleware?: Middleware | Middleware[]
    scrollToTop?: boolean
    transition?: string | Transition | ((to: Route, from: Route) => string)
    watchQuery?: boolean | string[]
    asyncData? (ctx: Context): object | undefined
    fetch? (ctx: Context): Promise<void> | void
    validate? (ctx: Context): Promise<boolean> | boolean
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $nuxt: {
      $loading: LoadingObject
    }
  }
}

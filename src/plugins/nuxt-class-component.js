import Component, { mixins } from 'vue-class-component'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

Component.registerHooks([
  // Vue Apollo
  'apollo',
  // vue-router
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
  // Nuxt
  'asyncData',
  'fetch',
  'head',
  // 'middleware',
  'layout',
  'transition',
  'scrollToTop',
  'validate'
])

export { Component as default, mixins, State, Getter, Action, Mutation, namespace }

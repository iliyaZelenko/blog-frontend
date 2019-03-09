// import { Context, Middleware, Transition, LoadingObject } from './nuxt'

declare module '*.vue' {
  import Vue from 'vue'
  const _default: Vue
  export default _default
}

// declare module "*.gql" {
//   import { DocumentNode } from 'graphql'
//
//   const content: DocumentNode
//   export default content
// }
//
// declare module "*.graphql" {
//   import { DocumentNode } from 'graphql'
//
//   const content: DocumentNode
//   export default content
// }

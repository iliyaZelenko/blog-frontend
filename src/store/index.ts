import Vuex from 'vuex'

import * as root from './root'
// import * as people from './modules/people'
import * as BackendRoutesModule from './modules/BackendRoutes'
import * as AuthModule from './modules/auth'
import * as UIModule from './modules/ui'

// More info about store: https://vuex.vuejs.org/en/core-concepts.html
// See https://nuxtjs.org/guide/vuex-store#classic-mode
// structure of the store:
// types: Types that represent the keys of the mutations to commit
// state: The information of our app, we can get or update it.
// getters: Get complex information from state
// action: Sync or async operations that commit mutations
// mutations: Modify the state

export interface ModulesStates {
  // до этого тут было BackendRoutes
  [BackendRoutesModule.NAME]: BackendRoutesModule.State
  [AuthModule.NAME]: AuthModule.State
  [UIModule.NAME]: UIModule.State
}

export type RootState = root.State & ModulesStates

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      [BackendRoutesModule.NAME]: BackendRoutesModule,
      [AuthModule.NAME]: AuthModule,
      [UIModule.NAME]: UIModule.default
    }
  })
}

export default createStore

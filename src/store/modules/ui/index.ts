import { Module } from 'vuex'
import { RootState } from '~/store'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'
import { State } from './types'

const localStorageKeysPrefix = 'UI'
export const localStorageKeys = {
  isDark: localStorageKeysPrefix + 'isDark'
}

export const state = (): State => ({
  isDark: false // !!global._$app.$cookies.get(localStorageKeys.isDark)
})
export const namespaced = true
export const NAME = 'UI'

interface ThisModule extends Module<State, RootState> {
  name: string
}

// class UI implements ThisModule {
//   public name = NAME
//   public namespaced = namespaced
//   public state = state
//   public getters = getters
//   public actions = actions
//   public mutations = mutations
// }
const UI: ThisModule = {
  name: NAME,
  namespaced,
  state,
  getters,
  actions,
  mutations
}
export default UI
export { State } from './types'

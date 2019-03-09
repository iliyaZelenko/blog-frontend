import { MutationTree } from 'vuex'
import { State } from './types'
import { SET_DARK } from './mutationsTypes'
import { localStorageKeys } from '~/store/modules/ui/index'

export const mutations: MutationTree<State> = {
  [SET_DARK] (state: State, payload: boolean) {
    state.isDark = payload
    global._$app.$cookies.set(localStorageKeys.isDark, payload.toString())
  }
}

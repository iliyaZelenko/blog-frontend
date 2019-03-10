import { MutationTree } from 'vuex'
import { StateInterface } from './types'
import { localStorageKeys } from '~/store/modules/ui/index'
import * as mutationsTypesLocal from '~/store/modules/ui/actionsTypes'

const {
  SET_DARK
} = mutationsTypesLocal

export const mutations: MutationTree<StateInterface> = {
  [SET_DARK] (state: StateInterface, payload: boolean) {
    state.isDark = payload
    global._$app.$cookies.set(localStorageKeys.isDark, payload.toString())
  }
}
export const mutationsTypes = mutationsTypesLocal

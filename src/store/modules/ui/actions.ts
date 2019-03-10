import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '~/store'
import { StateInterface } from './types'
import {
  SET_DARK as SET_DARK_MUTATION
} from './mutationsTypes'
import * as actionsTypesLocal from './actionsTypes'
import { localStorageKeys } from '~/store/modules/ui/index'

const {
  SET_DARK: SET_DARK_ACTION,
  INIT
} = actionsTypesLocal

export interface Actions<State, RootState> extends ActionTree<State, RootState> {
  [SET_DARK_ACTION] (context: ActionContext<State, RootState>, status: boolean): void
  [INIT] (context: ActionContext<State, RootState>, ctx: any): void
}

export const actions: Actions<StateInterface, RootState> = {
  [SET_DARK_ACTION] ({ commit }, status: boolean) {
    commit(SET_DARK_MUTATION, status)
  },
  [INIT] ({ commit }, ctx) {
    const status = !!global._$app.$cookies.get(localStorageKeys.isDark)

    commit(SET_DARK_MUTATION, status)
  }
}

export const actionsTypes = actionsTypesLocal

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '~/store'
import { State } from './types'
import { SET_DARK } from './mutationsTypes'

export interface Actions<State, RootState> extends ActionTree<State, RootState> {
  setDark (context: ActionContext<State, RootState>, status: boolean): void
}

export const actions: Actions<State, RootState> = {
  setDark ({ commit }, status: boolean) {
    commit(SET_DARK, status)
  }
}

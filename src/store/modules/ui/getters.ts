import { GetterTree } from 'vuex'
import { RootState } from '~/store'
import { StateInterface } from './types'

export const getters: GetterTree<StateInterface, RootState> = {
  isDark: (state: StateInterface) => state.isDark
}

import { GetterTree } from 'vuex'
import { RootState } from '~/store'
import { State } from './types'
// import { localStorageKeys } from '~/store/modules/ui/index'

// TODO криво сделал модуль и почему-то не работает global._$app
export const getters: GetterTree<State, RootState> = {
  isDark: state => {
    // @ts-ignore
    // console.log(global.$cookies, global._$app)

    return true // !!global._$app.$cookies.get(localStorageKeys.isDark)
  }
}

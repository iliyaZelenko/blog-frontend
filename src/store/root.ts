import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { ModulesStates, RootState } from 'store'
import * as BackendRoutesModule from './modules/BackendRoutes'
import * as AuthModule from './modules/auth'
import * as UIModule from './modules/ui'

export const types = {
  SET_META: 'SET_META'
}

export interface State extends ModulesStates {
  meta: any
  // [BackendRoutes.NAME]: any
  // [AuthModule.NAME]: any
}

export const state = (): State => ({ // было State
  meta: {},
  // TODO зачем там вообще функция? Хотя возможно лучше оставить, чтобы легче было переносить на Nuxt 3
  [BackendRoutesModule.NAME]: BackendRoutesModule.state(),
  [AuthModule.NAME]: AuthModule.state(),
  [UIModule.NAME]: UIModule.state()
})

export const getters: GetterTree<State, RootState> = {}

export interface Action<S, R> extends ActionTree<S, R> {
  nuxtServerInit (context: ActionContext<S, R>, serverContext): void
}

export const actions: Action<State, RootState> = {
  // context, serverContext
  async nuxtServerInit () {
    // await getBackandRoutes(context, serverContext)
  }
}

export const mutations: MutationTree<State> = {
  [types.SET_META] (state, meta) {
    state.meta = meta
  }
}

// TODO обратно раскомментировать
// async function getBackandRoutes ({ commit, state }, { app }) {
//   let backendRoutes: BackendRoutes.Route[] = [] //  | null
//
//   if (app.$cookies.get('backendRoutes')) {
//     backendRoutes = app.$cookies.get('backendRoutes')
//   } else {
//     const routes: {} = await app.$get('routes/') // { [s: string]: string; }
//     // backendRoutes = []
//
//     // трансформирует в массив роутов нужного типа
//     for (let name in routes) {
//       backendRoutes.push({
//         name,
//         path: routes[name]
//       })
//     }
//
//     app.$cookies.set('backendRoutes', backendRoutes)
//   }
//
//   commit(
//     `${BackendRoutes.NAME}/${BackendRoutes.TYPES.SET}`,
//     backendRoutes,
//     { root: true }
//   )
// }

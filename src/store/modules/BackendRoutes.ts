// ActionTree, GetterTree, ActionContext
import { MutationTree } from 'vuex'
// import { RootState } from 'store'

export const NAME = 'BackendRoutes'
export const namespaced = true

export const TYPES = {
  SET: 'SET'
}

export interface Route {
  name: string
  path: string
}

export interface State {
  routes: Route[]
}

export const state = (): State => ({
  routes: []
})

//
// export const getters: GetterTree<State, RootState> = {
//   selectedPerson: state => {
//     const p = state.people.find(person => person.id === state.selected)
//     return p ? p : { first_name: 'Please,', last_name: 'select someone' }
//   }
// }
//
// export interface Actions<S, R> extends ActionTree<S, R> {
//   select(context: ActionContext<S, R>, id: number): void
// }
//
// export const actions: Actions<State, RootState> = {
//   select({ commit }, id: number) {
//     commit(TYPES.SELECT, id)
//   }
// }
//
export const mutations: MutationTree<State> = {
  [TYPES.SET] (state, routes: Route[]) {
    state.routes = routes
  }
}

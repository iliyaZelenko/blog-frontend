import Vue from 'vue'

export default ({ store, app }, inject) => {
  const plugin = {
    get user () {
      return store.state.auth.user
    },
    get loggedIn () {
      return store.getters['auth/loggedIn']
    }
  }

  Vue.prototype.$auth = plugin

  inject('auth', plugin)
}

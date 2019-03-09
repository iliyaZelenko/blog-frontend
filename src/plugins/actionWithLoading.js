import Vue from 'vue'

// It makes it easy to launch an action in a component that is bound to the loading
Vue.prototype.$actionWithLoading = async function (action, loadingVariable = 'loading', ...arg) {
  this[loadingVariable] = true
  try {
    await action(...arg)
  } catch (e) {
    throw e // so that the error can be caught above
  } finally {
    this[loadingVariable] = false
  }
}

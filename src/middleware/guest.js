// import { store } from '@/store'
// import { vp } from '@/tools/helpers'
// import { showErrorUniversal } from '~/tools/helpers'

/**
 * If the user is already authenticated he shouldn't be able to visit
 * pages like login, register, etc...
 */
export default function (context) {
  const { store, redirect, route } = context
  const loggedIn = store.getters['auth/loggedIn']

  if (loggedIn) {
    let redirectTo

    if (!route.from) {
      redirectTo = '/' // false
    } else if (route.from.fullPath) {
      redirectTo = route.from.fullPath
    } else {
      redirectTo = { name: 'home' }
    }

    if (redirectTo !== undefined) {
      global._$app.$notify.error('This page is for guests only!')

      redirect(redirectTo)
    }
  }
}

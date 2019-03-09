// import { vp } from '~/tools/helpers'
// import { process, window } from '~/types/types'
import { USER, USER_LOGGED_IN, USER_LOGGED_OUT, TOKEN, REFRESH_TOKEN_EXPIRED } from './mutationsTypes'
// было просто vuex
import { MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from '~/store'
import { setTimeout, clearTimeout } from 'timers'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
import { TYPES } from '~/configs/dependencyInjection/types'
import { ObservableInterface } from '~/configs/dependencyInjection/interfaces'
import LoggedInBeforeEvent from '~/events/LoggedInBeforeEvent'
import SignInEvent from '~/events/SignInEvent'
import LogoutEvent from '~/events/LogoutEvent'

export const NAME = 'auth'
export const namespaced = true

// TODO Cookies
const localStorageKeys = {
  user: 'auth__user',
  token: 'auth__token',
  tokenExpiresIn: 'auth__tokenExpiresIn',
  refreshTokenExpiresIn: 'auth__refreshTokenExpiresIn'
}
const tokenSecondBeforeExpired = 50 // seconds before token expired, uses for refresh token request
// const moduleNamespace = 'auth/'
let refreshTimeoutId: NodeJS.Timeout // = null

// TODO добавил window.onNuxtReady а то почему то оно undefined (странно)
if (process.browser) {
  window.addEventListener('load', () => {
    // console.log(window.onNuxtReady, window.$nuxt)
    // window.onNuxtReady(({ $store }) => {
    const { context } = window.$nuxt.$store._modules.root._children.auth

    setTimeoutTokenRefresh(context)
    // })
  })
}

const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
const Observable = serviceContainer.get<ObservableInterface>(TYPES.ObservableInterface)

// TODO указать точные типы
export interface State {
  brow: any,
  user: any,
  token: any,
  tokenExpiresIn: any,
  refreshTokenExpiresIn: any,
  refreshTokenAlreadyExpired: any
}

// const actionFunction: any = 2

export interface Actions<S, R> extends ActionTree<S, R> {
  [key: string]: any
  setServerState (context: ActionContext<S, R>, nuxtContext: any)
  signin (context: ActionContext<S, R>, form: any): void
}

export const state = (): State => {
  return {
    brow: process.browser,
    user: null,
    token: null,
    tokenExpiresIn: null,
    refreshTokenExpiresIn: null,
    refreshTokenAlreadyExpired: false
  }
}

export const actions: Actions<State, RootState> = {
  async setServerState ({ commit }, { app }) {
    // console.log('initSetState')
    // console.log(app.$cookies.get(localStorageKeys.user))
    const tokenInfo = {
      accessToken: app.$cookies.get(localStorageKeys.token),
      expiresIn: +app.$cookies.get(localStorageKeys.tokenExpiresIn),
      refreshTokenExpiresIn: +app.$cookies.get(localStorageKeys.refreshTokenExpiresIn)
    }

    // JSON.parse(app.$cookies.get(localStorageKeys.user) || 'null')
    const user = app.$cookies.get(localStorageKeys.user)
    // console.log('user:', user ? user.name : user)

    commit(TOKEN, tokenInfo)
    commit(USER, user)
  },
  async signin ({ dispatch }, form) {
    const loggedInData = await global._$app.$post('auth/signin', form)
    const loggedInResult = await dispatch('loggedIn', loggedInData)

    await Observable.emit<SignInEvent>(
      SignInEvent.NAME,
      new SignInEvent(loggedInResult)
    )
  },
  async signup ({ dispatch }, form) {
    const loggedInData = await global._$app.$post('auth/signup', form)
    loggedInData.showMsg = false

    await dispatch('loggedIn', loggedInData)

    global._$app.$notify.success('Registered successfully!')
  },
  // user,
  async loggedIn (context, { tokenInfo, showMsg = true }) {
    const { commit, dispatch } = context

    await Observable.emit<LoggedInBeforeEvent>(
      LoggedInBeforeEvent.NAME,
      new LoggedInBeforeEvent(tokenInfo)
    )

    const user = await dispatch('getUser')

    commit(TOKEN, tokenInfo)
    commit(USER, user)
    commit(USER_LOGGED_IN, context)

    if (showMsg) {
      global._$app.$notify.success('logged in successfully!')
    }

    return {
      tokenInfo,
      user
    }
  },
  async getAndSetUser ({ commit, dispatch }) {
    // const { user } = await global._$app.$get('auth/user')
    const user = await dispatch('getUser')

    return commit(USER, user)
  },
  async getUser () {
    // const { user } = await global._$app.$get('auth/user')
    const user = await UserRepo.getAuthUser()

    console.log('User', user)

    return user
  },
  async logout (context) {
    const { dispatch, commit } = context

    await global._$app.$post('auth/logout')
    await dispatch('setNullTokenAndUser')
    commit(USER_LOGGED_OUT, { context, manually: true })

    await Observable.emit<LogoutEvent>(
      LogoutEvent.NAME,
      new LogoutEvent()
    )
  },
  async refresh (context) {
    const { dispatch, commit, getters } = context

    console.log('refresh')
    let tokenInfo
    try {
      tokenInfo = await global._$app.$post('auth/refresh')
    } catch (e) {
      global._$app.$notify.info(
        'Token refresh error.',
        'Looks like a network error has occurred. Please, refresh the page.', {
          timeout: 20000
        }
      )
      // if network error, try request again through recursion
      // setTimeout(() => {
      //   dispatch('refresh')
      // }, 500)
      return // stop function
    }

    if (tokenInfo.status === 'tokenAlreadyRefreshed') {
      // по идее должен был бы работать просто return, но почему-то
      // возникла ситуация что токен обновлен на сервере, а на клиенте нет
      if (getters.tokenExpired) {
        await dispatch('refreshTokenExpired')
      }

      return
    } else if (tokenInfo.status === 'refreshTokenExpired') {
      await dispatch('refreshTokenExpired')

      return
    }
    commit(TOKEN, tokenInfo)

    if (process.browser) {
      setTimeoutTokenRefresh(context)
    }
  },
  async refreshTokenExpired (context) {
    const { dispatch, commit } = context

    await dispatch('setNullTokenAndUser')
    commit(REFRESH_TOKEN_EXPIRED)
    commit(USER_LOGGED_OUT, { context, manually: true })
  },
  async setNullUser ({ commit }) {
    commit(USER, null)
  },
  async setNullTokenAndUser ({ commit }) {
    commit(TOKEN, null)
    commit(USER, null)
  },
  // save user from server here after editing
  async setUser ({ commit }, user) {
    commit(USER, user)
  },
  // выполняется только на сервере
  async init (context, { app }) {
    const { state, dispatch, getters } = context

    await dispatch('setServerState', { app })

    if (state.token && getters.secondsBeforeRefresh === 0) {
      console.log('На серваке вызываю сразу refresh')
      return dispatch('refresh')
    }
    // if (process.server) {
    // return dispatch('setServerState', { app }).then(() => {
    //   if (state.token && getters.secondsBeforeRefresh === 0) {
    //     console.log('На серваке вызываю сразу refresh')
    //     return dispatch('refresh')
    //   }
    //   // return setTimeoutTokenRefresh(context)
    // })
    // }
    // else if (process.browser) {
    //   setTimeoutTokenRefresh(context) // TODO await
    //   // setTimeoutTokenRefresh(state, dispatch)
    // }
  }
}

export const mutations: MutationTree<State> = {
  [USER] (state, user) {
    state.user = user

    // this.$cookies.set(localStorageKeys.user, user)
    // if (process.browser) {
    //   localStorage.setItem(localStorageKeys.user, JSON.stringify(user))
    // } else {
    this.$cookies.set(localStorageKeys.user, user)
    // }

    return user
  },
  [TOKEN] (state, token) {
    state.token = (token && token.accessToken) || ''
    state.tokenExpiresIn = +(token && token.expiresIn) || ''
    state.refreshTokenExpiresIn = +(token && token.refreshTokenExpiresIn) || ''

    // if (process.browser) {
    //   localStorage.setItem(localStorageKeys.token, state.token)
    //   localStorage.setItem(localStorageKeys.tokenExpiresIn, state.tokenExpiresIn)
    //   localStorage.setItem(localStorageKeys.refreshTokenExpiresIn, state.refreshTokenExpiresIn)
    // } else {
    this.$cookies.set(localStorageKeys.token, state.token)
    this.$cookies.set(localStorageKeys.tokenExpiresIn, state.tokenExpiresIn)
    this.$cookies.set(localStorageKeys.refreshTokenExpiresIn, state.refreshTokenExpiresIn)
    // }
  },
  [REFRESH_TOKEN_EXPIRED] (state) {
    if (state.refreshTokenAlreadyExpired) return

    state.refreshTokenAlreadyExpired = true
    stopTokenRefresh()
    if (process.browser) {
      showRefreshTokenExpiredMessage()
    }
  },
  [USER_LOGGED_IN] (state, payloadAsContext) {
    const { rootState } = payloadAsContext
    state.refreshTokenAlreadyExpired = false

    console.log(rootState)

    if (rootState.meta.guest) {
      this.$router.push(this.localePath({
        name: 'profile-user',
        params: {
          user: state.user.id
        }
      }))
    }

    setTimeoutTokenRefresh(payloadAsContext)
  },
  // @ts-ignore
  [USER_LOGGED_OUT] (state, { manually, context: { rootState } }) {
    stopTokenRefresh()

    // If route requires auth or guest, then redirect
    if (rootState.meta.auth) {
      this.$router.push({ name: 'auth-signin' })
    }
    // TODO это точно нужно?
    if (rootState.meta.guest) {
      this.$router.push('/')
    }
  }
}

export const getters: GetterTree<State, RootState> = {
  loggedIn: state => !!state.user,
  // tokenNeedToRefresh (state) {
  //   const needToRefreshStart = state.tokenExpiresIn - tokenSecondBeforeExpired
  //   const now = getUnixTimestamp()
  //
  //   return state.token && needToRefreshStart < now
  // },
  secondsBeforeRefresh (state) {
    const secondsFromNow = getUnixTimestamp()
    const secondsToRefresh = state.tokenExpiresIn - secondsFromNow - tokenSecondBeforeExpired

    return secondsToRefresh > 0 ? secondsToRefresh * 1000 : 0
  },
  tokenExpired (state) { // true if token expired
    return state.tokenExpiresIn < getUnixTimestamp()
  }
}

async function setTimeoutTokenRefresh ({ state, getters, dispatch }) { // , dispatch
  const { token } = state

  if (!token) {
    console.log('Не поставил')
    return
  }
  console.log('Поставил')

  const timeoutMs = getters.secondsBeforeRefresh

  clearTimeout(refreshTimeoutId)
  if (timeoutMs) {
    // only in browser (по идее эта проверка даже не нужна)
    // if (process.browser) {
    //   await setTimeoutPromise(timeoutMs)
    //
    //   return dispatch('refresh')
    // } else if (process.server) {
    await setTimeoutPromise(timeoutMs)

    return dispatch('refresh')
    // }
  } else {
    return dispatch('refresh')
  }

  // function refresh () {
  //   return dispatch('refresh') // moduleNamespace +    , null, { root: true }
  // }
}

// function refresh () {
//   return dispatch('refresh')
// }

function stopTokenRefresh () {
  clearTimeout(refreshTimeoutId) // because we dont need to refresh token
}

function showRefreshTokenExpiredMessage () {
  global._$app.$notify.info('Please, log in again')
}

function getUnixTimestamp () {
  // need to / 1000 because Date.now() return ms not seconds
  return Math.floor(Date.now() / 1000)
}

function setTimeoutPromise (ms) {
  return new Promise(resolve => {
    refreshTimeoutId = setTimeout(resolve, ms)
  })
}

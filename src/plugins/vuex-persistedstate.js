// import createPersistedState from 'vuex-persistedstate'
// // import * as BackendRoutes from '~/store/modules/BackendRoutes'
//
// export default ({ store, app, isHMR, isClient }) => {
//   // In case of HMR, mutation occurs before nuxReady, so previously saved state
//   // gets replaced with original state received from server. So, we've to skip HMR.
//   // Also nuxtReady event fires for HMR as well, which results multiple registration of
//   // vuex-persistedstate plugin
//   if (isHMR) return
//
//   console.log(1)
//
//   createPersistedState({
//     // key: 'yourkey',
//     // paths: [...],
//     // reducer: (state) => ({
//     //   [BackendRoutes.NAME]: state[BackendRoutes.NAME]
//     // }),
//     storage: {
//       getItem: key => {
//         console.log('get', app.$cookies.get(key))
//
//         return isClient ? app.$cookies.get(key) : getC()[key]
//       },
//       setItem: (key, value) => {
//         console.log('set')
//
//         JSON.stringify(app.$cookies.set(key, value))
//       },
//       removeItem: key =>
//         app.$cookies.remove(key)
//     }
//   })(store)
// }
//
// function getC () {
//   document.cookie.split(';').reduce((cookieObject, cookieString) => {
//     let splitCookie = cookieString.split('=').map((cookiePart) => { cookiePart.trim() })
//     try {
//       cookieObject[splitCookie[0]] = JSON.parse(splitCookie[1])
//     } catch (error) {
//       cookieObject[splitCookie[0]] = splitCookie[1]
//     }
//     return cookieObject
//   })
// }

// async middleware for auth
export default async function ({ app, route, store }) {
  const token = store.state.auth.token
  const user = store.state.auth.user
  const needToRefresh = store.getters['auth/tokenNeedToRefresh']

  // init auth module(refresh token if needed)
  if (process.server) {
    await store.dispatch('auth/init', { app, store })
  }

  try {
    // if site have token but dont have user – need to get user
    !user && token && !needToRefresh && await store.dispatch('auth/getAndSetUser')
  } catch (e) {
    console.error(e)
  }

  // if token removed
  if (!token && user) {
    await store.dispatch('auth/setNullUser')
  }
}

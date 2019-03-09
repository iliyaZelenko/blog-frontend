import { vp } from '@/tools/helpers'
// import {  } from '@/tools/store/mutationTypes/auth/emailVerification'

export const state = () => ({
  //
})

export const actions = {
  async resend ({ dispatch, commit }) {
    const responseMsg = await vp.$post('auth/email/resend')

    vp.$notify.success(responseMsg)
  },
  async verify ({ dispatch, commit }, queryURL) {
    try {
      const { message, user } = await vp.$post(queryURL)

      dispatch('auth/setUser', user, { root: true })

      vp.$notify.success(message)
      this.$router.push({ name: 'profile' })
    } catch ({ response: { status, message } }) {
      if (status === 401) {
        this.$router.push({ name: 'signin' })
      } else if (status === 429) {
        this.$router.push({ name: 'profile' })
      }
    }
  }
}

export const mutations = {
  //
}

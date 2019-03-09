import { vp } from '@/tools/helpers'
// import {  } from '@/tools/store/mutationTypes/auth/forgotPassword'

export const state = () => ({
  //
})

export const actions = {
  async sendEmail ({ dispatch, commit }, email) {
    let { href } = this.$router.resolve({
      name: 'auth-reset-password-token-email',
      params: {
        token: '<token>',
        email: '<email>'
      }
    })
    // нужно для генерации ссылки в почту
    let port = location.port ? (':' + location.port) : ''
    let resetUrl = location.protocol + '//' + location.hostname + port + href

    const { message } = await vp.$post('auth/forgot-password-email', { email, resetUrl })

    vp.$notify.success(message)
  },
  async resetPassword ({ dispatch, commit }, data) {
    const loggedInData = await vp.$post('auth/forgot-password-reset', data)
    loggedInData.showMsg = false

    await dispatch('auth/loggedIn', loggedInData, { root: true })

    vp.$notify.success('Password has been reset successfully!')
  }
}

export const mutations = {
  //
}

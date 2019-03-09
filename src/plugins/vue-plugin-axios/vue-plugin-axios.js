import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-plugin-axios'
import { showServerError } from '~/tools/validator'

export default ({ store, app }, inject) => {
  VueAxios.install(Vue, {
    axios,
    config: {
      baseURL: process.env.FULL_API_URL,
      mode: 'cors',

      // TODO одно из свойств ниже лишнее (для XHR и fetch отличается)
      withCredentials: true,
      credentials: 'include',

      headers: {
        // so laravel (and maybe symfony) will understand that this is ajax $request->ajax()
        'X-Requested-With': 'XMLHttpRequest'
      }
    },
    nuxtInject: inject,
    interceptors: {
      beforeRequest (config, axiosInstance) {
        const token = store.state.auth.token

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      beforeResponseError (error) {
        const { response, message } = error

        if (response) { // backend error
          showServerError(response)
        } else if (message) { // network error
          app.$notify.error(message)
        }

        // this creates an additional exception that is not needed
        // return Promise.reject(error)
      }
    }
  })
}

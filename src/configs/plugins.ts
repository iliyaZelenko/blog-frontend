import { join } from 'path'
const { PLUGINS_DIR } = global.appEnv

export default processPlugins([
  // {
  //   src: 'notifications',
  //   ssr: false
  // },
  'i18n',
  'registerGlobalComponents',
  'notifications',
  'date',
  'serviceContainer',
  'inject',
  'nuxt-class-component',
  'vuetify',
  'vue-plugin-axios/vue-plugin-axios',
  // 'vuex-persistedstate.js',
  'auth',
  'actionWithLoading',
  'validator',
  'vue-apollo'
])

function processPlugins (plugins) {
  return plugins.map((i) => {
    if (i.src) {
      i.src = join(PLUGINS_DIR, i.src)

      return i
    }

    return join(PLUGINS_DIR, i)
  })
}

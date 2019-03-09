// строчка ниже не работает
// import * as i18n from '~/configs/i18n'
import { join } from 'path'
const { CONFIGS_DIR } = global.appEnv

const i18n = require(`${join(CONFIGS_DIR, 'i18n.ts')}`)

export default [
  // '~/modules/myModule.ts',
  '~/modules/typescript',
  '@nuxtjs/apollo',
  '@nuxtjs/style-resources',
  'cookie-universal-nuxt',
  ['nuxt-i18n', i18n]
]

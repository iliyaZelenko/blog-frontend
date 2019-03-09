import { join } from 'path'
import * as env from './env'

// declare global {
//   namespace NodeJS {
//     interface Global {
//       appEnv: any
//       _$app: any
//     }
//   }
// }

global.appEnv = env
const {
  /* Paths */
  SRC_DIR,
  CONFIGS_DIR,
  // STYLES_DIR,
  /* URL */
  // BASE_URL,
  // BASE_API_URL,
  // FULL_API_URL,
  // FULL_API_GRAPHQL_URL,
  /* Locales */
  // DEFAULT_LOCALE,
  // FALLBACK_LOCALE,
  // LOCALES,
  /* Server */
  NUXT_HOST,
  NUXT_PORT
  /* Other */
  // BROWSERS_SUPPORT,
  // NODE_SUPPORT
} = env

const modules = require(join(CONFIGS_DIR, 'modules.ts')).default
const router = require(join(CONFIGS_DIR, 'routing/router.ts')).default
const plugins = require(join(CONFIGS_DIR, 'plugins.ts')).default
const build = require(join(CONFIGS_DIR, 'build.ts')).default
const apollo = require(join(CONFIGS_DIR, 'apollo.ts')).default
const head = require(join(CONFIGS_DIR, 'head.ts')).default
const css = require(join(CONFIGS_DIR, 'css.ts')).default
const styleResources = require(join(CONFIGS_DIR, 'styleResources.ts')).default

// import i18nMessages from './src/i18n/messages'
// import extendRoutes from './src/configs/routing/extendRoutes.ts'

module.exports = {
  mode: 'universal',

  /**
   * Current environment
   */
  env,

  /**
   * Server settings
   */
  server: {
    host: NUXT_HOST, // default: localhost
    port: NUXT_PORT // default: 3000
  },

  /**
   * Set source directory
   */
  srcDir: SRC_DIR,

  /**
   * Какой CSS подключить
   */
  css,

  /**
   * Плагины (интеграция библиотек в Nuxt.js)
   */
  plugins,

  /**
   * Модули (типо плагинов, но обычно других разработчиков)
   */
  modules,

  // Give apollo module options
  apollo,

  /**
   * Глобальный доступ к стилям из других файлов
   */
  styleResources,

  /**
   *  Headers of the page
   */
  head,

  router,

  /**
   * Customize the progress bar color
   */
  loading: {
    color: '#fff100', // '#3B8070'
    height: '5px'
  },

  /**
   * Build configuration
   * https://nuxtjs.org/api/configuration-build
   */
  build
}

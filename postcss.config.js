// import createResolver from 'postcss-import-resolver'
// import { SRC_DIR, ROOT_DIR, BROWSERS_SUPPORT } from './env'
// const createResolver = require('postcss-import-resolver')
// const { join, dirname } = require('path')
// const postcssReporter = require('postcss-reporter')
const { SRC_DIR, ROOT_DIR, BROWSERS_SUPPORT } = require('./env')

// https://nuxtjs.org/api/configuration-build#postcss
module.exports = ({ file, options, env }) => ({
  // debug files
  sourceMap: true,

  // switch syntax automatically by file extensions
  syntax: require('postcss-syntax'),

  plugins: {
    // https://github.com/postcss/postcss-url
    // 'postcss-url': {},
    // stylelint: {
    //   ignoreFiles: [dirname(__dirname, 'node_modules/**/*.css'), dirname(__dirname, '.nuxt')], // [join(ROOT_DIR, 'src/plugins'), 'node_modules', 'src/plugins'],
    //   configFile: join(ROOT_DIR, 'stylelint.config.js'),
    //   ignorePath: join(ROOT_DIR, '.stylintignore')
    // },

    /* типо Babel, но для css */
    // https://github.com/csstools/postcss-preset-env
    'postcss-preset-env': {
      browsers: BROWSERS_SUPPORT,

      // 2 is default
      stage: 2,

      features: {
        'nesting-rules': true
      }
    },
    //
    //   /* Позволяет использовать импоты в файлах */
    //   // https://github.com/postcss/postcss-import
    //   'postcss-import': {
    //     // root: file.dirname,
    //     resolve: createResolver({
    //       alias: {
    //         '~': SRC_DIR,
    //         '~~': ROOT_DIR,
    //         '@': SRC_DIR,
    //         '@@': ROOT_DIR
    //       },
    //       modules: [
    //         SRC_DIR,
    //         ROOT_DIR
    //         // ...this.modulesDir
    //       ]
    //     }),
    //     plugins: []
    //   },
    //
    'postcss-reporter': {
      clearReportedMessages: true
    },

    /* Оптимизация */
    cssnano: env === 'production'
      ? {
        preset: 'default'
      }
      : false
  }
})

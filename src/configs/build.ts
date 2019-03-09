const { NODE_SUPPORT, BROWSERS_SUPPORT } = global.appEnv

export default {
  extractCSS: true,

  // настройки postcss (игнорируются если есть postcss.config.js)
  // postcss: {},

  babel: {
    plugins: [
      '@babel/plugin-proposal-optional-chaining'
      // в babel 7 используется этот пакет, a не "transform-runtime"
      // '@babel/plugin-transform-runtime'
    ],
    presets ({ isServer }) {
      return [
        ['@nuxtjs/babel-preset-app', {
          useBuiltIns: 'usage', //  | 'entry' | false
          modules: false,
          targets:
            isServer
              // таким образом можно использовать современные возможности node, а серверная сборка будет в указанйо версии
              ? { node: NODE_SUPPORT }
              // https://github.com/browserslist/browserslist#best-practices
              // https://github.com/babel/babel/issues/7789
              // { browsers: ['defaults'] }
              : { browsers: BROWSERS_SUPPORT }
        }],
        ['@babel/preset-typescript']
      ]
    }
  },

  // extend webpack (source configs: https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config)
  extend (config, { isDev, isClient }) {
    // config.resolve.alias['@'] = join(__dirname, SRC_DIR)
    // config.resolve.extensions.push('.ts')

    if (isDev && isClient) {
      // Run ESLint on save
      config.module.rules.push({
        enforce: 'pre', // before save
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
      // stylint (linter for stylus)
      // {
      //   enforce: 'pre',
      //   test: /\.styl(us)?$/,
      //   loader: 'stylint',
      //   exclude: /(node_modules)/
      // })
    }
  }
}

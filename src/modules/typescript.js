export default function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts')
  // Extend build
  this.extendBuild((config) => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      },
      exclude: [
        /dist/,
        /\.temp/
      ]
    }
    // Add TypeScript loader
    config.module.rules.push(
      Object.assign(
        {
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    )
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts')
    }
  })
}

// export default function () {
//   // Add .ts & .tsx extension to Nuxt
//   this.nuxt.options.extensions.push('ts', 'tsx')
//
//   // Extend webpack build
//   this.extendBuild(config => {
//     // Add TypeScript
//     config.module.rules.push({
//       test: /\.tsx?$/,
//       loader: 'ts-loader',
//       options: { appendTsSuffixTo: [/\.vue$/] }
//     })
//
//     // Add .ts extension in webpack resolve
//     if (!config.resolve.extensions.includes('.ts')) {
//       config.resolve.extensions.push('.ts')
//     }
//
//     // Add .tsx extension in webpack resolve
//     if (!config.resolve.extensions.includes('.tsx')) {
//       config.resolve.extensions.push('.tsx')
//     }
//   })
// }

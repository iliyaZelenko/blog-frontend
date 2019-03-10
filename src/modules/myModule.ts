// import { NuxtModule } from 'nuxt'
//
// class MyModule extends NuxtModule {
//   static get key() {
//     return 'myModule'
//   }
//
//   // This mapping can be moved into base class too
//   static get hooks() {
//     return {
//       'nuxt:init': 'onNuxtInit',
//       'bulder:build': 'onBuild'
//     }
//   }
//
//   async onBuild() {
//     this.addPlugin(...)
//   }
//
//   async onNuxtInit() {
//     this.nuxt.render = (_, res) => res.end('🌈')
//   }
// }

// Compile class into a plain function
// export default MyModule.export()

export default function () {
  // console.log('000')
  // this.nuxt.hook('ready', async nuxt => {
  //   console.log('0000')
  //
  //   if (process.server) {
  //     global._$app = nuxt
  //     // console.log(global._$app)
  //   }
  //   if (process.browser) {
  //     window._$app = nuxt
  //     global._$app = nuxt
  //     // @ts-ignore
  //     // window.global = {
  //     //   _$app: app
  //     // }
  //     // console.log(window._$app)
  //   }
  // })
}

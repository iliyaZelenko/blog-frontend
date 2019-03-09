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

export default function SimpleModule () {
  // console.log('Nuxt', this.nuxt)
  // Write your code here
}

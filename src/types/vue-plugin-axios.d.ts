// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    // https://github.com/iliyaZelenko/vue-plugin-axios#full-api
    $get (endpoint: string, config?: object): void
    $post (endpoint: string, config?: object): void
    // TODO удалить из пакета и добавить этот файл для поддержки ts
    // $delete(endpoint: string, config?: object): void
    // $options(endpoint: string, config?: object): void
    $put (endpoint: string, config?: object): void
    $patch (endpoint: string, config?: object): void
  }
}

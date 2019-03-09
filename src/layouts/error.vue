<template>
  <div>
    <v-img
      :src="require('~/assets/backgrounds/illustrations/md_oops.png')"
      :lazy-src="require('~/assets/backgrounds/illustrations/md_oops.png')"
      height="500"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        />
      </v-layout>
    </v-img>

    <v-alert
      :value="true"
      type="error"
      class="display-1 text-xs-center"
    >
      {{ text }}

      <v-btn
        :to="localePath({ name: 'index' })"
        class="ml-3"
        color="primary"
      >
        На главную
      </v-btn>
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Provide as ProvideServiceContainerForInversify } from 'vue-inversify-decorator'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import TheToolbar from '~/components/layouts/main/TheToolbar.vue'
import TheNavigationDrawer from '~/components/layouts/main/TheNavigationDrawer.vue'
import { serviceContainer } from '~/configs/dependencyInjection/container'

@Component({
  name: 'ErrorLayout',
  components: {
    TheToolbar, TheNavigationDrawer
  }
})
@ProvideServiceContainerForInversify(serviceContainer)
export default class ErrorLayout extends Vue {
  @Prop(Object) error!: any

  /**
   * Hook ставящий заголовок
   */
  head () {
    return {
      title: `Ошибка ${this.error.statusCode}`
    }
  }

  get text () {
    // Ниже не подъодит из-за того что message есть всегда, если его не указать, то message: "{↵  "statusCode": 404↵}"
    // `Произошла ошибка ${this.error.statusCode}${this.error.message ? ': ' + this.error.message : ''}.`
    return `Произошла ошибка ${this.error.statusCode}: ${this.error.message}.`
  }
}
</script>

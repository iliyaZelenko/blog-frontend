<template>
  <v-app
    :dark="isDark"
  >
    <the-toolbar @navigation-drawer="onNavigationDrawerChange" />
    <the-navigation-drawer v-model="navigationDrawer" />
    <v-content
      :style="contentStyle"
    >
      <!-- fluid -->
      <v-container style="height: 100%; width: 100%;">
        <v-layout
          class="pt-3"
          column
          justify-start
          fill-height
          wrap
          align-start
        >
          <transition
            name="router"
            mode="out-in"
            tag="div"
          >
            <nuxt style="width: 100%;" />
          </transition>
        </v-layout>
      </v-container>

      <!-- Кнопка "наверх" -->
      <v-fab-transition>
        <v-btn
          v-show="hasGoToTopBtn"
          :small="$vuetify.breakpoint.smAndDown"
          color="primary"
          fab
          fixed
          bottom
          right
          @click="$vuetify.goTo(0)"
        >
          <v-icon>
            keyboard_arrow_up
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Provide as ProvideServiceContainerForInversify } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import TheToolbar from '~/components/layouts/main/TheToolbar.vue'
import TheNavigationDrawer from '~/components/layouts/main/TheNavigationDrawer.vue'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import { TYPES } from '~/configs/dependencyInjection/types'
import { ScrollInterface } from '~/configs/dependencyInjection/interfaces'
import {
  namespace
} from 'nuxt-class-component'
import * as UIModule from '~/store/modules/ui'

const UI = namespace(UIModule.NAME)
const backgroundsByRoute = {
  'auth-signin': 'http://kimcochrane.ca/wp-content/uploads/2018/03/001anaturewater2.jpg',
  'auth-signup': 'http://s1.1zoom.me/b5051/880/Switzerland_Winter_Lake_Kander_Valley_Fir_Snow_517722_1920x1080.jpg'
}

@Component({
  name: 'MainLayout',
  components: {
    TheToolbar, TheNavigationDrawer
  }
})
@ProvideServiceContainerForInversify(serviceContainer)
export default class MainLayout extends Vue {
  @UI.Getter isDark!: boolean
  // @inject(TYPES.ScrollInterface) private scroll!: ScrollInterface

  public navigationDrawer: boolean = false
  public hasGoToTopBtn: boolean = false

  // Для теста ошибок SSR
  // created () {
  //   if (process.server) {
  //     this.$notify.warn('Hello', 'How are you?')
  //     this.$notify.info('Bye', 'I\'m good!')
  //   }
  // }

  get contentStyle () {
    // @ts-ignore
    const background = backgroundsByRoute[this.$route.name.split('__')[0]] // backgroundsByRoute[this.$route.name]

    return {
      background: background ? `url(${background})` : 'none'
    }
  }

  mounted () {
    // browser-side only class
    const scroll = serviceContainer.get<ScrollInterface>(TYPES.ScrollInterface)

    scroll.observer.on('scroll', scrollVal => {
      this.hasGoToTopBtn = scrollVal > 100
    })

    this.showMessagesFromServer()
  }

  onNavigationDrawerChange () {
    this.navigationDrawer = !this.navigationDrawer
  }

  // TODO вынести в отдельный компонент
  showMessagesFromServer () {
    const messages = this.$cookies.get('showMessagesInBrowser')

    if (messages && messages.length) {
      for (const messageObj of messages) {
        const { title, message, type, timeout } = messageObj

        this.$notify[type](title, message, { timeout })
      }

      this.$cookies.set('showMessagesInBrowser', null)
    }
  }
}
</script>

<template>
  <v-navigation-drawer
    :value="value"
    :mini-variant="mini"
    temporary
    fixed
    app
    @input="$emit('input', arguments[0])"
  >
    <v-list class="pa-1">
      <v-list-tile
        v-if="mini"
        @click.stop="mini = !mini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        tag="div"
        avatar
      >
        <v-list-tile-avatar>
          <nuxt-link
            v-if="$auth.loggedIn"
            :to="localePath({ name: 'profile-user', params: { user: $auth.user.id } })"
          >
            <user-avatar />
          </nuxt-link>
          <img
            v-else
            src="https://practice.privatbank.ua/Content/images/no-avatar.png"
            alt="Аватар гостя"
          >
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>
            {{ $auth.loggedIn ? $auth.user.nickname: 'Гость' }}
          </v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            v-if="!mini"
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-layout
      v-if="!mini"
      class="mx-3"
      justify-center
      align-center
    >
      <v-icon left>
        brightness_4
      </v-icon>

      Ночной режим

      <v-spacer />

      <v-switch
        v-if="!mini"
        v-model="darkThemeSwitch"
        style="flex: 0 1 auto;"
        color="primary"
        @change="setDarkTheme"
      />
    </v-layout>

    <v-list
      class="pt-0"
      dense
    >
      <v-divider light />

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="getItemsRoutePath(item.to)"
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!--
    <v-list>
      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template slot="activator">
          <v-list-tile>
            <v-list-tile-title>Categories</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template slot="activator">
            <v-list-tile>
              <v-list-tile-title>Root</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            @click="() => {}"
          >
            <v-list-tile-title>Child</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>
                view_list
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list>
    -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'
import ElSizeVariantsType, { SM } from '~/components/user/avatar/ElSizeVariantsType'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'
import {
  namespace
} from 'nuxt-class-component'
import * as UIModule from '~/store/modules/ui'
import { SET_DARK } from '~/store/modules/ui/actionsTypes'

const UI = namespace(UIModule.NAME)

@Component({
  components: { UserAvatar }
})
export default class TheToolbarUserMenu extends Vue {
  @Prop({ type: Boolean, required: true }) value

  // @ts-ignore
  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface

  @UI.Getter isDark!: boolean
  @UI.Action [SET_DARK]

  SM: ElSizeVariantsType = SM
  items = [
    { title: 'Home', icon: 'home', to: 'index' },
    { title: 'Categories', icon: 'view_list', to: 'categories' }
  ]
  mini: boolean = false
  darkThemeSwitch!: boolean

  created () {
    this.darkThemeSwitch = this.isDark
  }

  getItemsRoutePath (routeName) {
    return this.pathGenerator.generate({ name: routeName })
  }

  setDarkTheme (status) {
    this[SET_DARK](status)
  }
}
</script>

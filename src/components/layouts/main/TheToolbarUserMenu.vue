<template>
  <!--attach because v-toolbar have app attribute-->
  <v-menu
    :close-on-content-click="false"
    class="ml-3"
    transition="slide-y-transition"
    open-on-hover
    offset-y
    attach
    left
  >
    <v-btn
      slot="activator"
      flat
    >
      <span
        class="pr-3"
        style="text-transform: none !important;"
      >
        {{ $auth.user.nickname }}
      </span>

      <user-avatar />
    </v-btn>

    <v-card>
      <v-list>
        <v-list-tile :to="localePath({ name: 'profile-user', params: { user: $auth.user.id } })">
          <v-list-tile-action><v-icon>person</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Профиль
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="localePath({ name: 'settings' })">
          <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Настройки
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!--.prevent-->
        <v-list-tile @click="$actionWithLoading(logout, 'loadingLogout')">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Выйти
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { namespace } from 'vuex-class'
import Component from '~/plugins/nuxt-class-component'
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'

const authModule = namespace('auth')

@Component({
  components: { UserAvatar }
})
export default class TheToolbarUserMenu extends Vue {
  loadingLogout: boolean = false

  @authModule.Action logout
}
</script>

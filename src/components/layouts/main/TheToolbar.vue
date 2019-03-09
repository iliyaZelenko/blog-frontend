<template>
  <!--fixed-->
  <v-toolbar
    color="primary"
    height="64px"
    clipped-left
    dark
    app
  >
    <v-toolbar-side-icon @click="$emit('navigation-drawer')" />

    <!--<img
      class="app-toolbar__logo hidden-xs-only ml-3 mr-2"
      src="http://www.google.com.ua/doodle4google/images/splashes/featured.png"
      style="height: 55px;"
      @click="$router.push({ name: 'index' })"
    >-->
    <v-toolbar-title class="mr-4">
      {{ $t('blog_title') }}
    </v-toolbar-title>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        :to="localePath({ name: 'index' })"
        exact
        flat
      >
        {{ $t('app_toolbar_navigation_home') }}
      </v-btn>

      <v-btn
        :to="localePath({ name: 'categories' })"
        flat
      >
        Категории
      </v-btn>

      <!--
      <v-btn
        :to="localePath({ name: 'routes' })"
        flat
      >
        {{ $t('app_toolbar_navigation_routes') }}
      </v-btn>-->

      <v-btn
        :to="localePath({ name: 'debug' })"
        flat
      >
        <v-icon left>
          error_outline
        </v-icon>
        Debug
      </v-btn>
    </v-toolbar-items>

    <v-spacer />
    <!--
    &lt;!&ndash;solo-inverted&ndash;&gt;
    <v-text-field
      append-icon="mic"
      prepend-inner-icon="search"
      class="hidden-sm-and-down mx-3"
      label="Поиск"
      hide-details
      solo
      flat
      dense
      @click:append="() => {}"
    />
    -->

    <template v-if="$auth.loggedIn">
      <the-toolbar-user-notifications />

      <v-divider
        vertical
        inset
      />

      <the-toolbar-user-menu />
    </template>
    <template v-else>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--attach because v-toolbar have app attribute-->
        <v-menu
          :nudge-width="200"
          :close-on-content-click="false"
          class="ml-3"
          transition="slide-x-transition"
          open-on-hover
          offset-y
          attach
          left
        >
          <v-btn
            slot="activator"
            flat
          >
            <v-icon left>
              lock
            </v-icon>
            <span
              class="pr-3"
              style="text-transform: none !important;"
            >
              Аутентификация
            </span>
          </v-btn>

          <v-card>
            <v-card-text>
              <!--solo-->
              <!--text-->
              <v-text-field
                v-model="form.email"
                v-validate="'required|' + $formValidator.rules.email"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                label="Email"
                prepend-inner-icon="email"
              />

              <v-text-field
                v-model="form.password"
                v-validate="$formValidator.rules.password"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                label="Password"
                prepend-inner-icon="lock"
              />

              <v-btn
                :loading="loading"
                color="primary"
                class="py-1"
                nuxt
                @click.prevent="submit"
              >
                Войти
              </v-btn>

              <span class="ml-1">
                или
                <nuxt-link :to="localePath({ name: 'auth-signup' })">
                  зарегестрироваться
                </nuxt-link>
              </span>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-toolbar-items>

      <!--
      <v-btn
        :loading="loading"
        round
        @click.prevent="submit"
      >
        Sign in
      </v-btn>

      <span class="ml-1">
        or
        <router-link :to="{ name: 'auth-signup' }">
          Sign up
        </router-link>
      </span>
      -->
    </template>

    <locale-switcher />
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import TheToolbarUserNotifications from '~/components/layouts/main/TheToolbarUserNotifications.vue'
import TheToolbarUserMenu from '~/components/layouts/main/TheToolbarUserMenu.vue'
import LocaleSwitcher from '~/components/LocaleSwitcher'

import {
  // State,
  // Getter,
  // Action,
  // Mutation,
  namespace
} from 'nuxt-class-component'

const authModule = namespace('auth')
const authEmailVerificationModule = namespace('auth/emailVerification')

@Component({
  components: {
    TheToolbarUserNotifications,
    TheToolbarUserMenu,
    LocaleSwitcher
  }
  // data: () => ({
  //   hello: '222'
  // })
  // apollo: {
  //   hello: {
  //     query: gql`{hello}`
  //   }
  // }
})
export default class TheToolbar extends Vue {
  // data: () => ({
  form = {
    email: 'test@test.com',
    password: 'secret'
  }
  loading = false
  loadingLogout = false
  // })

  @authModule.Action signin
  @authModule.Action logout
  @authEmailVerificationModule.Action resend

  async submit () {
    await this.$actionWithLoading(this.signin, 'loading', this.form)
  }

  async resendEmailVerification () {
    await this.$actionWithLoading(this.resend, 'resendLoading')
  }
  // ...mapActions('auth', ['signin', 'logout']),
  // ...mapActions('auth/emailVerification', ['resend'])
}
</script>

<style>
/*.app-toolbar {*/
  /*background-color: #202124;*/
  /*!* height: 150px; *!*/
/*}*/

/* .app-toolbar .v-toolbar__extension {
  height: 60px !important;
} */

.app-toolbar__logo {
  cursor: pointer;
  /* background-color: white;*/
  /* padding: 3px; */
  margin-left: 30px;
  /* border-radius: 14px; */
}
</style>

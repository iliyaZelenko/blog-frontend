<template>
  <div style="height: 100%;">
    <v-layout
      fill-height
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md6
        lg4
        xl3
      >
        <v-card class="elevation-10 app-border-all-round">
          <v-toolbar
            color="lime"
            card
            prominent
          >
            <v-layout
              class="display-1"
              justify-center
            >
              Sign in
            </v-layout>
          </v-toolbar>
          <v-card-text>
            <!--<h1 class="text-center">Sign in</h1>-->
            <!--<router-link-->
            <!--to="/"-->
            <!--class="float-left"-->
            <!--&gt;-->
            <!--🡄  Go back-->
            <!--</router-link>-->
            <br>
            <form
              class="mt-4 w-100"
              autocomplete="on"
              @submit.prevent="submit"
              @keydown.enter="submit"
            >
              <v-text-field
                v-model="form.email"
                v-validate="'required|' + $formValidator.rules.email"
                :error-messages="errors.collect('email')"
                type="email"
                label="Почта"
                data-vv-name="email"
                prepend-inner-icon="mail"
                required
                box
              />

              <!--class="x-3 mt-2"-->
              <v-text-field
                v-model="form.password"
                v-validate="$formValidator.rules.password"
                :error-messages="errors.collect('password')"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                data-vv-name="password"
                label="Password"
                prepend-inner-icon="lock"
                required
                box
                @click:append="showPassword = !showPassword"
              />
            </form>
          </v-card-text>
          <v-card-actions class="px-3 pb-3">
            <v-btn
              :loading="loading"
              :disabled="!!errors.items.length"
              color="primary"
              large
              block
              @click="submit"
            >
              <v-icon left>
                directions_walk
              </v-icon>
              Sign in
            </v-btn>
          </v-card-actions>

          <div class="text-xs-center pb-3">
            <v-icon class="mr-1">
              help
            </v-icon>
            <router-link :to="{ name: 'auth-forgot-password' }">
              Forgot password?
            </router-link>

            <span class="mx-3" />

            <v-icon class="mr-1">
              person_add
            </v-icon>
            <router-link :to="{ name: 'auth-signup' }">
              Sign up
            </router-link>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signin',
  middleware: 'guest',
  meta: {
    guest: true
  },
  data: () => ({
    form: {
      email: 'test@test.com',
      password: 'password'
    },
    loading: false,
    showPassword: true
  }),
  methods: {
    async submit () {
      if (await this.$formValidator.validate(this.form)) {
        this.loading = true
        try {
          await this.signin(this.form)
        } finally {
          this.loading = false
        }
      }
    },
    ...mapActions('auth', ['signin'])
  },
  head () {
    return {
      title: 'Страница входа',
      meta: [
        { content: 'Это страница входа', name: 'description', hid: 'description' }
      ]
    }
  }
}
</script>

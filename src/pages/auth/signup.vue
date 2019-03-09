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
              Sign up
            </v-layout>
          </v-toolbar>
          <v-card-text>
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

              <v-text-field
                v-model="form.name"
                v-validate="$formValidator.rules.name"
                :error-messages="errors.collect('name')"
                type="text"
                label="Имя"
                data-vv-name="name"
                prepend-inner-icon="person"
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
                how_to_reg
              </v-icon>
              Sign up
            </v-btn>
          </v-card-actions>

          <div class="text-xs-center pb-3">
            <router-link :to="localePath({ name: 'auth-signin' })">
              Already have an account?
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
  name: 'Signup',
  middleware: 'guest',
  meta: {
    guest: true
  },
  data: () => ({
    form: {
      name: 'Vasya Pupkin',
      email: 'vasya@test.com',
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
          await this.signup(this.form)
        } finally {
          this.loading = false
        }
      }
    },
    ...mapActions('auth', ['signup'])
  },
  head () {
    return {
      title: 'Sign Up Page',
      meta: [
        { content: 'Sign Up Page Description', name: 'description', hid: 'description' }
      ]
    }
  }
}
</script>

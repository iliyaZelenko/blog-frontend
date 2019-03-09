<template>
  <v-layout
    fill-height
    justify-center
    align-center
    column
  >
    <!--<pre>{{ $store.state }}</pre>-->
    <div>
      <v-btn
        :to="localePath({
          name: 'profile-user',
          params: {
            user: ($auth.loggedIn && $auth.user.id) || 1
          }
        })"
        color="primary"
      >
        <v-icon left>
          security
        </v-icon>
        Профиль
      </v-btn>

      <v-btn
        :to="localePath({ name: 'auth-signup' })"
        color="amber"
        nuxt
      >
        <v-icon left>
          how_to_reg
        </v-icon>
        Sign up
      </v-btn>

      <v-btn
        :to="localePath({ name: 'auth-signin' })"
        color="green"
        nxut
      >
        <v-icon left>
          directions_walk
        </v-icon>
        Sign in
      </v-btn>
    </div>

    <div class="my-4">
      <b>Logged in:</b> {{ $auth.loggedIn }}

      <br>

      <b>User: </b><span v-show="!$auth.loggedIn">
        –
      </span>
      <pre
        v-if="$auth.user"
        class="pl-4"
      >{{ $auth.user }}</pre>
      <br v-else>

      <b class="mb-2">
        Token:
      </b>
      <span
        v-if="token"
        :title="token"
      >
        {{ token.slice(0, 40) + '...' }}
      </span>
      <span v-else>
        –
      </span>

      <br>

      <b>Token expiration:</b> <span v-html="tokenExpiresInFormated || ' –'" />
      <br>
      <b>Refresh token expiration:</b> <span v-html="refreshTokenExpiresInFormated || ' –'" />
    </div>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    form: {
      email: 'test@test.com',
      password: 'password'
    },
    loading: false,
    tokenExpiresInFormated: null,
    refreshTokenExpiresInFormated: null
  }),
  computed: {
    ...mapState('auth', ['token', 'refreshToken', 'tokenExpiresIn', 'refreshTokenExpiresIn', 'user']),
    ...mapGetters('auth', ['loggedIn'])
  },
  mounted () {
    Math.floor(Date.now() / 1000)

    this.setExpiresTime()
    setInterval(this.setExpiresTime, 1000)
  },
  methods: {
    async submit () {
      this.loading = true
      try {
        await this.signin(this.form)
      } catch (e) {
        // console.log(e)
      }
      this.loading = false
    },
    setExpiresTimeByToken (tokenKeyInDate) {
      if (!this.loggedIn) {
        this[tokenKeyInDate + 'ExpiresInFormated'] = null
        return
      }

      const diff = this[tokenKeyInDate + 'ExpiresIn'] - Math.floor(Date.now() / 1000)
      const diffAbs = Math.abs(diff)
      // parseInt(this, 10) // don't forget the second param
      const hours = `0${Math.floor(diffAbs / 3600)}h`.slice(-3)
      const minutes = `0${Math.floor((diffAbs % 3600) / 60)}m`.slice(-3)
      const seconds = `0${Math.floor(diffAbs % 60)}s`.slice(-3)

      const diffTime = [hours, minutes, seconds].join(':')
      if (diff <= 0) {
        this[tokenKeyInDate + 'ExpiresInFormated'] = `<span style="color: red"> token expired ${diffTime.slice(1)} ago.</span>`
      } else {
        this[tokenKeyInDate + 'ExpiresInFormated'] = diffTime
      }
    },
    setExpiresTime () {
      this.setExpiresTimeByToken('token')
      this.setExpiresTimeByToken('refreshToken')
    },
    ...mapActions('auth', ['signin'])
  }
}
</script>

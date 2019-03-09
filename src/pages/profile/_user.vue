<template>
  <div
    v-if="owner"
    style="width: 100%;"
  >
    <h1 class="display-2">
      {{ owner.name }}
    </h1>

    <v-layout
      flex
      wrap
    >
      <v-flex
        xs12
        sm5
        md4
        lg3
        xl2
      >
        <!--left sidebar 300px; -->
        <left-sidebar
          :owner="owner"
          style="max-width: 100%;"
        />
      </v-flex>
      <!--right sidebar-->
      <v-flex
        xs12
        sm7
        md8
        lg9
        xl10
      >
        <div :class="{ 'pl-4': $breakpoint.is('smAndUp') }">
          <v-toolbar
            class="mb-3"
            color="lime"
            tabs
          >
            <v-tabs
              color="transparent"
              slider-color="green"
              centered
            >
              <v-tab :to="{ name: 'profile-user', params: { user: owner.id } }">
                Main info
              </v-tab>
              <v-tab :to="{ name: 'profile-user-friends', params: { user: owner.id } }">
                Friends
              </v-tab>
            </v-tabs>
          </v-toolbar>

          <!--v-model="model"-->
          <v-tabs-items>
            <v-tab-item class="px-1 py-1">
              <transition
                name="router"
                mode="out-in"
              >
                <nuxt-child :owner="owner" />
                <!--<router-view :owner="owner" />-->
              </transition>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import LeftSidebar from '~/components/profile/LeftSidebar.vue'
import { UserRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import { UserInterface } from '~/apollo/schema/users'

const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)

@Component({
  // name: 'Profile',
  components: { LeftSidebar }
  // meta: {
  //   auth: true
  // },
  // middleware: 'auth'
})
export default class Profile extends Vue {
  // name: 'Profile',
  // middleware = 'auth'
  // meta: {
  //   auth: true
  // }
  // props: {
  //   user: {
  //     type: String | Number,
  //     required: true
  //   }
  // },
  // validate ({ params }) {
  //   return params.user instanceof String || params.user instanceof Number
  // },

  public owner: UserInterface | null = null

  async asyncData ({ app, params: { user }, error }) {
    let owner

    if (app.$auth.loggedIn && user === app.$auth.user.id) {
      // owner = app.$auth.user
      owner = await UserRepo.getAuthUserProfile()
    } else {
      // owner = await app.$get('profile/other/get-user', {
      //   params: { id: route.params.user }
      // })
      owner = await UserRepo.getUserProfile(user)

      if (!owner) {
        return error({
          statusCode: 404,
          message: 'пользователь не найден'
        })
      }
    }

    return { owner }
  }
}
</script>

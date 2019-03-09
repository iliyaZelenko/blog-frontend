<template>
  <user-menu :user="user">
    <v-layout
      slot="activator"
      align-center
      @click="onUserClick"
    >
      <user-avatar
        :user="user"
        :el-size-variant="avatarElSizeVariant"
      />

      <span class="body-2 ml-2">
        {{ user.nickname }}
        <span
          v-if="user.fullName"
          class="grey--text"
        >
          <br>
          {{ user.fullName }}
        </span>
      </span>
    </v-layout>
  </user-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import Component from '~/plugins/nuxt-class-component'
import { UserInterface } from '~/apollo/schema/users'
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'
import UserMenu from '~/components/user/UserMenu.vue'
import ElSizeVariantsType from '~/components/user/avatar/ElSizeVariantsType'

@Component({
  name: 'User',
  components: { UserMenu, UserAvatar }
})
export default class User extends Vue {
  @Prop(Object) user!: UserInterface
  @Prop(String) avatarElSizeVariant!: ElSizeVariantsType

  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface

  onUserClick () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'profile-user',
        params: {
          user: this.user.id.toString()
        }
      })
    )
  }
}
</script>

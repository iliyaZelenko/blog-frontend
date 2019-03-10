<template>
  <v-avatar
    :size="realElSize"
    color="grey lighten-4"
  >
    <v-img
      :src="imgSrc"
      :lazy-src="guestAvatar"
      aspect-ratio="1"
      alt="Аватар"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <v-progress-circular
          color="grey lighten-5"
          indeterminate
        />
      </v-layout>
    </v-img>
  </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import { AVATAR_SM, AvatarSizeTypes, UserInterface } from '~/apollo/schema/users'
import ElSizeVariantsType, { LG, MD, SM } from '~/components/user/avatar/ElSizeVariantsType'

@Component({
  name: 'UserAvatar'
})
export default class UserAvatar extends Vue {
  @Prop(String) elSize!: string
  @Prop({ default: MD }) elSizeVariant!: ElSizeVariantsType
  @Prop(Object) user!: UserInterface
  @Prop({ default: AVATAR_SM }) sizeType!: AvatarSizeTypes

  guestAvatar = 'https://practice.privatbank.ua/Content/images/no-avatar.png'

  get avatarOwner () {
    return this.user || this.$auth.user
  }

  get realElSize () {
    if (this.elSize) return this.elSize

    const variants = {
      [SM]: 26,
      [MD]: 38,
      [LG]: 66
    }

    return variants[this.elSizeVariant] + 'px'
  }

  get imgSrc () {
    // 'http://sharethingz.com/wp-content/uploads/2014/08/avatar-512x350.png?x96597'
    return this.avatarOwner.avatar ? this.avatarOwner.avatar[this.sizeType] : this.guestAvatar
  }
}
</script>

<template>
  <div style="width: 100%;">
    <posts :owner="owner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import Posts from '~/components/profile/ActivityPosts.vue'
import { UserInterface } from '~/apollo/schema/users'

@Component({
  name: 'ProfileHome',
  components: { Posts },
  scrollToTop: true
})
export default class ProfileHome extends Vue {
  @Prop(Object) owner!: UserInterface
}
</script>

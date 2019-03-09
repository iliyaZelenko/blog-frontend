<template>
  <div
    class="post"
  >
    <v-card>
      <v-img
        :src="'https://picsum.photos/200/300?image=' + post.id"
        aspect-ratio="2.75"
      />

      <v-card-title primary-title>
        <h3 class="headline mb-0">
          {{ post.title }}
        </h3>

        <time class="mt-2 grey--text">
          {{ $date(post.createdAt) }}
        </time>

        <v-spacer />

        <rating
          :info="ratingInfo"
          sm-buttons
        />
      </v-card-title>

      <v-card-text class="pt-0">
        {{ post.contentShort }}
      </v-card-text>

      <v-card-actions>
        <div class="pl-3">
          <!--Автор: <b>{{ post.user.nickname }}</b> {{ post.user.fullName ? `(${post.user.fullName})` : '' }}-->

          <user :user="post.user" />
        </div>

        <v-spacer />

        <v-btn
          color="orange"
          class="white--text"
          text
          @click="goToPost"
        >
          {{ $t('posts_page_read_more_btn') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'
import { PostInterface } from '~/apollo/schema/posts'
import Rating from '~/components/rating/Rating.vue'
import User from '~/components/user/User.vue'

@Component({
  components: { User, Rating }
})
export default class Post extends Vue {
  @Prop(Object) post!: PostInterface

  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface

  get ratingInfo () {
    return {
      value: this.post.ratingValue,
      positive: this.post.ratingValuePositive,
      negative: this.post.ratingValueNegative
    }
  }

  goToPost () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'post',
        params: {
          id: this.post.id.toString(),
          slug: this.post.titleSlug
        }
      })
    )
  }
}
</script>

<template>
  <v-menu
    :value="value"
    :close-on-content-click="false"
    origin="center center"
    transition="scale-transition"
    offset-y
    @input="$emit('input', arguments[0])"
  >
    <div slot="activator">
      <v-btn
        small
        icon
      >
        <v-icon color="info">
          info
        </v-icon>
      </v-btn>
    </div>

    <v-card>
      <v-card-text>
        <span class="font-weight-bold grey--text darken-2">
          Ответов:
        </span>

        {{ comment.repliesCount }}

        <span v-if="comment.allRepliesCount > comment.repliesCount">
          ({{ comment.allRepliesCount }} со вложенными)
        </span>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import { CommentInterface } from '~/apollo/schema/comments'

@Component({
  name: 'PostCommentInfoMenu'
})
export default class PostComment extends Vue {
  @Prop(Boolean) value!: boolean
  @Prop(Object) comment!: CommentInterface
}
</script>

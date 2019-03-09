<template>
  <div>
    <v-textarea
      v-if="true"
      :ref="uniqueRef"
      v-validate="'required|' + $formValidator.rules['comment-message']"
      :error-messages="errors.collect('comment-message')"
      :value="value"
      :loading="loading"
      class="mt-3"
      data-vv-name="comment-message"
      placeholder="Оставить кооментарий"
      append-outer-icon="send"
      rows="1"
      auto-grow
      box
      single-line
      @click:append-outer="createComment"
      @input="$emit('input', arguments[0])"
    />

    <!--snackbarIsSuccess ? 'success' : 'error'-->
    <v-snackbar
      v-model="snackbar"
      :color="['error', 'success'][+snackbarIsSuccess]"
      top
    >
      {{ snackbarText }}

      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import Component from '~/plugins/nuxt-class-component'
import { CommentRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import { PostInterface } from '~/apollo/schema/posts'
import { CommentInterface } from '~/apollo/schema/comments'

@Component({
  name: 'PostCommentCreationForm'
})
export default class extends Vue {
  @Prop(String) value!: string
  @Prop(Object) post!: PostInterface
  @Prop(Object) comment!: CommentInterface

  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface

  public loading: boolean = false
  public snackbar: boolean = false
  public snackbarIsSuccess: boolean | null = null
  public snackbarText: string | null = null

  get uniqueRef () {
    return 'postCommentCreationFormTextarea' + Date.now()
  }

  mounted () {
    // @ts-ignore
    this.$refs[this.uniqueRef].focus()
  }

  async createComment () {
    const input = {
      postId: this.post.id,
      userId: this.$auth.user.id,
      commentId: this.comment ? this.comment.id : null,
      content: this.value
    }

    this.loading = true

    try {
      await this.commentRepo.createComment(input)

      this.snackbar = true
      this.snackbarText = 'Созданно успешно!'
      this.snackbarIsSuccess = true

      this.$emit('comment-created')
    } catch (e) {
      this.snackbar = true
      this.snackbarText = 'Произошла ошибка!'
      this.snackbarIsSuccess = false
    }

    this.loading = false
  }
}
</script>

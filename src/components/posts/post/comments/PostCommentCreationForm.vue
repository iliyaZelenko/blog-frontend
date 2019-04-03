<template>
  <div>
    <v-textarea
      v-if="true"
      :ref="uniqueRef"
      v-validate="'required|' + $formValidator.rules.commentMessage"
      :error-messages="errors.collect('commentMessage')"
      :value="value"
      :loading="loading"
      data-vv-name="commentMessage"
      class="mt-3"
      placeholder="Оставить кооментарий"
      append-outer-icon="send"
      rows="1"
      auto-grow
      box
      single-line
      @click:append-outer="createComment"
      @input="$emit('input', arguments[0])"
    />
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

  get uniqueRef () {
    return 'postCommentCreationFormTextarea' + Date.now()
  }

  mounted () {
    // @ts-ignore
    this.$refs[this.uniqueRef].focus()
  }

  async createComment () {
    if (!await this.$validator.validate()) return

    const input = {
      postId: this.post.id,
      userId: this.$auth.user.id,
      commentId: this.comment ? this.comment.id : null,
      content: this.value
    }

    this.loading = true

    // TODO this.$notify.
    try {
      await this.commentRepo.createComment(input)

      this.$notify.success('Созданно успешно!')
      this.$emit('comment-created')
    } catch (e) {
      this.$notify.error('Произошла ошибка!')
    }

    this.loading = false
  }
}
</script>

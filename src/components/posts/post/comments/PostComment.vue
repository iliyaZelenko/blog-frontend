<template>
  <div
    :class="{
      'post-comment': true,
      'post-comment--xs': $breakpoint.is('smAndDown')
    }"
  >
    <v-card
      flat
    >
      <div
        v-if="nestedLvl"
        class="pt-4"
      >
        <v-icon
          v-for="lvl of nestedLvl"
          :key="'nested-level-' + lvl"
          style="display: inline;"
          small
        >
          arrow_forward_ios
        </v-icon>
      </div>
      <div style="width: 100%;">
        <v-card-title>
          <user
            class="mr-3"
            :user="comment.user"
            :avatar-el-size-variant="userAvatarSizeVariant"
          />

          <rating
            class="mx-3"
            :info="ratingInfo"
            sm-buttons
          />

          <time class="mt-2 grey--text">
            {{ $date(comment.createdAt) }}
          </time>

          <post-comment-info-menu
            v-model="commentMenuMoreInfo"
            :comment="comment"
            class="ml-2"
          />
        </v-card-title>
        <v-card-text>
          <!-- Обращение, чтобы было понятно кому идет ответ -->
          <span v-if="isLastNestedLvl">
            <b>{{ comment.repliedComment.user.nickname }}</b>,
          </span>

          <!--Сообщение (текст / контент) комментария-->
          <div
            class="mb-4 d-inline-block"
            v-html="comment.content"
          />

          <!--Меню с кнопками-->
          <div class="post-comment__buttons-menu">
            <v-btn
              v-if="$auth.loggedIn"
              :color="showCommentCreationForm ? 'error' : ''"
              small
              @click="showCommentCreationForm = !showCommentCreationForm"
            >
              <v-icon left>
                {{ showCommentCreationForm ? 'close' : 'add_comment' }}
              </v-icon>

              {{ showCommentCreationForm ? 'Скрыть форму' : 'Комментировать' }}
            </v-btn>

            <!-- Если имеет вложенные комменты и если не последний уровень вложенности -->
            <template v-if="hasRepliesComments && !isLastNestedLvl">
              <template v-if="hasRepliesCommentsFullLoaded">
                <v-btn
                  color="primary"
                  small
                  @click="showRepliesComments = !showRepliesComments"
                >
                  <v-icon left>
                    {{ showRepliesComments ? 'visibility_off' : 'visibility' }}
                  </v-icon>

                  {{ showRepliesComments ? 'Скрыть ответы' : `Показать ответы (${realRepliesCount})` }}
                </v-btn>
              </template>
              <template v-else-if="!isRoot || (isRoot && realRepliesCount > ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT)">
                <v-btn
                  :loading="repliesCommentsLoading"
                  color="info"
                  small
                  @click="onClickShowMore"
                >
                  <v-icon left>
                    arrow_downward
                  </v-icon>

                  <template v-if="isRoot && ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT">
                    Показать еще ответы ({{ realRepliesCount - ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT }})
                  </template>
                  <template v-else>
                    <!-- Только для первого уровня вложенности показывается 1 коммент -->
                    Показать ответы ({{ realRepliesCount }})
                  </template>
                </v-btn>
              </template>
            </template>
          </div>

          <div>
            <v-expand-transition>
              <post-comment-creation-form
                v-if="showCommentCreationForm"
                v-model="commentCreationFormText"
                :post="post"
                :comment="comment"
                @comment-created="onCommentCreated"
              />
            </v-expand-transition>

            <v-expand-transition>
              <!--.sync для comments не подходит TODO .sync еще используется в root комментах-->
              <post-comments
                v-show="showRepliesComments"
                :comments="comment.repliesComments"
                :post="post"
                :comments-replied-comment="comment"
                :loading.sync="repliesCommentsLoading"
                :nested-lvl="nestedLvl + 1"
                :observable="observable"
                @update:comments="setRepliesComments"
              />
            </v-expand-transition>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import { CommentInterface } from '~/apollo/schema/comments'
import Rating from '~/components/rating/Rating.vue'
import User from '~/components/user/User.vue'
import { PostInterface } from '~/apollo/schema/posts'
import { ObservableInterface, CommentRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import PostCommentCreationForm from '~/components/posts/post/comments/PostCommentCreationForm.vue'
import { ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT, COMMENTS_MAX_NESTED_LVL_DEFAULT } from '~/configs/app'
import PostCommentInfoMenu from '~/components/posts/post/comments/PostCommentInfoMenu.vue'
import { SM } from '~/components/user/avatar/ElSizeVariantsType'

@Component({
  name: 'PostComment',
  components: { PostCommentInfoMenu, PostCommentCreationForm, User, Rating }
})
export default class PostComment extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comment!: CommentInterface
  // точнее коммент который родитель данного коммента, не обязательно совпадает с repliedComment
  @Prop(Object) repliedComment!: CommentInterface | null
  @Prop(Number) nestedLvl!: number
  @Prop(Boolean) isLastNestedLvl!: boolean

  @Inject(TYPES.ObservableInterface) private observable!: ObservableInterface
  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface

  // public readonly COMMENTS_MAX_NESTED_LVL_DEFAULT: number = COMMENTS_MAX_NESTED_LVL_DEFAULT
  public readonly ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT: number = ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT
  public showRepliesComments: boolean = true
  public showCommentCreationForm: boolean = false
  public commentCreationFormText: string = ''
  public commentMenuMoreInfo: boolean = false
  public repliesCommentsLoading: boolean = false
  public userAvatarSizeVariant = SM

  get ratingInfo () {
    return {
      value: this.comment.ratingValue,
      positive: this.comment.ratingValuePositive,
      negative: this.comment.ratingValueNegative
    }
  }

  // get repliesComments () {
  //   // const defaultComments = { data: [], paginatorInfo: null }
  //
  //   return this.comment.repliesComments // || defaultComments
  // }
  // set repliesComments (val) {
  //   console.log('set', val)
  //
  //   this.comment.repliesComments = val
  //
  //   // this.$set(this.comment, 'repliesComments', val)
  // }

  setRepliesComments (val) {
    // TODO deep copy
    const commentCopy = { ...this.comment }
    commentCopy.repliesComments = val

    this.$emit('update:comment', commentCopy)
  }

  get realRepliesCount () {
    return (this.isLastNestedLvl! || this.isRepliesCommentsOnLastLvl)
      ? this.comment.allRepliesCount
      : this.comment.repliesCount
  }

  get isRoot (): boolean {
    return !this.nestedLvl
  }

  get isRepliesCommentsOnLastLvl (): boolean {
    return this.nestedLvl === COMMENTS_MAX_NESTED_LVL_DEFAULT - 1
  }

  // isBeforeLastNestedLvl
  // get isBeforeLastNestedLvl () {
  //   return this.nestedLvl < this.COMMENTS_MAX_NESTED_LVL_DEFAULT
  // }

  get hasRepliesComments (): boolean {
    return !!this.realRepliesCount
  }

  get hasRepliesCommentsFullLoaded (): boolean {
    return !!(this.comment.repliesComments && this.comment.repliesComments.paginatorInfo)
  }

  onClickShowMore () {
    this.observable.emit('loadComments')
  }

  async onCommentCreated () {
    let comment

    if (this.hasRepliesCommentsFullLoaded) {
      comment = await this.commentRepo.getComment(
        this.comment.id,
        // не хватает optional chaining
        this.comment.repliesComments.paginatorInfo!.currentPage,
        this.comment.repliesComments.paginatorInfo!.perPage
      )
    } else {
      comment = await this.commentRepo.getComment(this.comment.id, undefined, undefined)
    }

    this.$emit('update:comment', comment)
    await this.$nextTick()

    if (this.isLastNestedLvl) { // обновить комменты моего родителя
      this.$emit('parent-load-comments')
    } else { // обновить мои комменты
      this.observable.emit('loadComments')
    }

    this.showCommentCreationForm = false
  }
}
</script>

<style lang="stylus">
  .post-comment
    display: flex !important

    .v-card
      display: flex

      .v-card__text
        padding-right: 0
        margin-right: 0

    &.post-comment--xs
      .v-card .v-card__text
        padding-left: 0
        margin-left: 0
</style>

<template>
  <v-layout
    v-if="comments"
    class="post-comments"
    column
  >
    <v-expand-transition>
      <div
        v-if="comments.paginatorInfo"
        :class="{
          'post-comments__top-panel': true,
          'post-comments__top-panel--root': isRoot
        }"
      >
        <v-card
          v-if="showPagination"
          :class="{
            'pt-2 mt-2': true,
            'root-comments-pagination-card': isRoot,
            'replies-comments-pagination-card replies-comments-pagination-card--top': !isRoot
          }"
          :flat="isRoot"
        >
          <v-layout
            justify-space-between
            wrap
          >
            <v-flex
              sm12
              md4
              lg3
            >
              <post-comment-preview-comments-count
                v-if="isRoot"
                v-model="previewCommentsCount"
                @input="onPreviewCommentsChange"
              />
            </v-flex>

            <v-flex
              sm12
              md4
              lg3
            >
              <v-layout
                justify-center
              >
                <v-pagination
                  :value="comments.paginatorInfo.currentPage"
                  :length="comments.paginatorInfo.lastPage"
                  :circle="!isRoot"
                  @input="onPageChange(arguments[0])"
                />
              </v-layout>
            </v-flex>

            <v-flex
              v-if="comments.paginatorInfo.total > 1"
              sm12
              md4
              lg3
            >
              <!--:style="'position: absolute; margin-top: 15px;' + (isRoot ? 'right: 45px;' : 'right: 0;')"-->
              <post-comments-per-page
                v-model="perPage"
                :loading="perPageLoading"
                style="flex: 0 1 auto;"
                @input="onPerPageChange"
              />
            </v-flex>
          </v-layout>
        </v-card>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div
        v-if="!loading || !comments.paginatorInfo"
        style="width: 100%;"
      >
        <transition-group
          name="v-expand-transition"
          tag="div"
        >
          <post-comment
            v-for="(comment, i) of comments.data"
            :key="'comment-' + i + comment.id"
            :comment.sync="comments.data[i]"
            :replied-comment="commentsRepliedComment"
            :post="post"
            :nested-lvl="nestedLvl"
            :is-last-nested-lvl="isLastNestedLvl"
            @parent-load-comments="onParentLoadComments"
          />
        </transition-group>
      </div>
    </v-expand-transition>

    <v-layout justify-center>
      <v-expand-transition>
        <v-progress-circular
          v-if="loading"
          :size="50"
          class="ma-5"
          color="blue"
          indeterminate
        />
      </v-expand-transition>
    </v-layout>

    <v-card
      v-if="!loading && showPagination"
      :class="{
        'pb-2 mb-2': true,
        'root-comments-pagination-card': isRoot,
        'replies-comments-pagination-card replies-comments-pagination-card--bottom': !isRoot
      }"
      :flat="isRoot"
    >
      <v-layout justify-center>
        <!--TODO для length попробовать lastPage-->
        <v-pagination
          :value="comments.paginatorInfo.currentPage"
          :length="comments.paginatorInfo.lastPage"
          :circle="!isRoot"
          @input="onPageChange(arguments[0])"
        />
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import {
  CommentRepositoryInterface,
  ObservableInterface
} from '~/configs/dependencyInjection/interfaces'
import { CommentInterface, CommentsInterface } from '~/apollo/schema/comments'
import PostComment from '~/components/posts/post/comments/PostComment.vue'
import { PostInterface } from '~/apollo/schema/posts'
import PostCommentsPerPage from '~/components/posts/post/comments/PostCommentsPerPage.vue'
import {
  COMMENTS_MAX_NESTED_LVL_DEFAULT,
  COMMENT_COMMENTS_REPLIES_ALL_PER_PAGE_DEFAULT,
  COMMENT_COMMENTS_REPLIES_PER_PAGE_DEFAULT,
  ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT,
  ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT
} from '~/configs/app'
import PostCommentPreviewCommentsCount from '~/components/posts/post/comments/PostCommentPreviewCommentsCount.vue'

@Component({
  name: 'PostComments',
  components: { PostCommentPreviewCommentsCount, PostComment, PostCommentsPerPage }
})
export default class PostComments extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comments!: CommentsInterface
  @Prop(Object) commentsRepliedComment!: CommentInterface | null
  @Prop(Object) observable!: ObservableInterface | null
  @Prop(Number) nestedLvl!: number
  @Prop(Boolean) isRoot!: boolean

  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface
  // @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public readonly COMMENTS_MAX_NESTED_LVL_DEFAULT: number = COMMENTS_MAX_NESTED_LVL_DEFAULT
  public loading: boolean = false
  public perPageLoading: boolean = false
  public perPage: number | null = null
  public previewCommentsCount: number | null = null
  public loadCommentsListener: ((param?: any) => any) | null = null

  get showPagination () {
    return this.comments.paginatorInfo && this.comments.paginatorInfo.lastPage > 1
  }

  get isLastNestedLvl (): boolean {
    return this.nestedLvl === this.COMMENTS_MAX_NESTED_LVL_DEFAULT
  }

  get repliedCommentRealRepliesCount (): number {
    return this.isLastNestedLvl!
      ? this.commentsRepliedComment!.allRepliesCount
      : this.commentsRepliedComment!.repliesCount
  }

  get commentsTotal () {
    if (this.commentsRepliedComment) {
      return this.repliedCommentRealRepliesCount
    } else {
      return this.comments.paginatorInfo!.total
    }
  }

  get lastPage (): number {
    return Math.ceil(this.commentsTotal / this.perPage!)
  }

  created () {
    this.perPage = this.isRoot
      ? ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT
      : (this.isLastNestedLvl
        ? COMMENT_COMMENTS_REPLIES_ALL_PER_PAGE_DEFAULT
        : COMMENT_COMMENTS_REPLIES_PER_PAGE_DEFAULT
      )
    this.previewCommentsCount = ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT

    // если есть this.commentsRepliedComment, то будет и this.observable
    if (!this.observable) return

    this.loadCommentsListener = async ({ page, perPage } = {
      page: this.isRoot ? this.comments.paginatorInfo!.currentPage : this.lastPage,
      perPage: this.perPage
    }) => {
      await this.loadComments(page, perPage)
    }

    this.observable.on('loadComments', this.loadCommentsListener!)
  }

  beforeDestroy () {
    if (!this.observable) return

    this.observable!.removeListener('loadComments', this.loadCommentsListener!)
  }

  setLoading (status: boolean) {
    this.loading = status
    this.$emit('update:loading', this.loading)
  }

  async onParentLoadComments () {
    // возможно не currentPage, а lastPage
    await this.loadComments()
  }

  async onPageChange (page: number) {
    await this.loadComments(page)
  }

  async onPreviewCommentsChange () {
    await this.loadComments()
  }

  async onPerPageChange (perPage) {
    // TODO сразу обновлять последнюю страницу (ниже строчка в теории должна работать правильно, но если хорошо
    // потестить, то наблюдаются проблемы что loadComments не правильно ставит страницу
    // this.comments.paginatorInfo!.lastPage = this.lastPage

    if (this.comments.paginatorInfo!.currentPage > this.lastPage) {
      this.comments.paginatorInfo!.currentPage = this.lastPage
    }

    this.perPageLoading = true
    await this.loadComments(this.comments.paginatorInfo!.currentPage, perPage)
    this.perPageLoading = false
  }

  async loadComments (page: number = this.comments.paginatorInfo!.currentPage, perPage: number = this.perPage!) {
    if (this.commentsRepliedComment) { // получает комменты-ответы коммента
      const method = this.isLastNestedLvl ? 'getCommentRepliesAllPaginated' : 'getCommentRepliesPaginated'
      this.setLoading(true)
      const repliesComments: CommentsInterface = await this.commentRepo[method](
        this.commentsRepliedComment.id,
        page,
        perPage
      )
      this.$emit('update:comments', repliesComments)
      this.setLoading(false)
    } else if (this.isRoot) { // получает комменты поста
      this.setLoading(true)
      const comments = await this.commentRepo.getCommentsPaginatedByPost(
        this.post.id,
        page,
        perPage,
        this.previewCommentsCount!
      )
      this.$emit('update:comments', comments)
      this.setLoading(false)
    }
  }
}
</script>

<style lang="stylus">
  .post-comments__top-panel
    display: flex
    z-index: 1

    /*&.post-comments__top-panel--root*/
      /*height: 50px*/

  .root-comments-pagination-card
    width: 100%
    background: none !important
    background-color: none !important

  .replies-comments-pagination-card
    width: 100%

    &.replies-comments-pagination-card--top
      box-shadow: 0 -5px 1px -2px rgba(0,0,0,0.2), 0 -2px 1px -2px rgba(0,0,0,0.2);
      border-top-left-radius: 25px
      border-top-right-radius: 25px
      border-bottom: 0

    &.replies-comments-pagination-card--bottom
      box-shadow: 0 3px 1px -3px rgba(0,0,0,0.2), 0px 3px 0px 0 rgba(0,0,0,0.14), 0px 6px 1px -1px rgba(0,0,0,0.12);
      border-bottom-left-radius: 25px
      border-bottom-right-radius: 25px
      border-top: 0
</style>

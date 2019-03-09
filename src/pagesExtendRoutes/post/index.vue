<template>
  <div class="w-100 h-100">
    <h1 class="mt-5 mb-3 display-3 font-weight-light">
      {{ post.title }}
    </h1>

    <v-layout
      class="mb-4"
      align-center
      wrap
    >
      <user :user="post.user" />

      <v-icon class="ml-4">
        category
      </v-icon>

      <div class="body-2 ml-1 mr-2">
        Category:

        <nuxt-link
          :to="getCategoryPath(post.category)"
        >
          <b>
            {{ post.category.name }}
          </b>
        </nuxt-link>
      </div>

      <rating
        class="mx-4"
        :info="ratingInfo"
      />

      <v-icon>
        label
      </v-icon>

      <span class="body-2 ml-1 mr-2">
        Tags:
      </span>

      <tags :post="post" />
    </v-layout>

    <p class="body-1">
      {{ post.content }}
    </p>

    <v-card style="position: absolute; width: 100vw; left: 0;">
      <v-container>
        <!--style="position: absolute; left: 50px;"-->
        <div>
          <b>Всего комментов: </b> {{ post.commentsCount }}.
          <b>Комментов на странице (со вложеными): </b> {{ nestedCommentsCount }}.

          <b>Root комментов на странице: </b> {{ post.comments.paginatorInfo.count }}.
          <b>Root комментов всего: </b> {{ post.comments.paginatorInfo.total }}.
        </div>

        <br>

        <v-alert
          :value="!$auth.loggedIn"
          type="info"
        >
          Чтобы комментировать, нужно быть аутентифицированным.
          <nuxt-link
            :to="pathGenerator.generate('auth-signin')"
            class="white--text font-weight-bold"
          >
            Войти
          </nuxt-link>
          или
          <nuxt-link
            :to="pathGenerator.generate('auth-signup')"
            class="white--text font-weight-bold"
          >
            зарегестрироваться.
          </nuxt-link>
        </v-alert>

        <template v-if="$auth.loggedIn">
          <v-btn
            :color="showCommentCreationForm ? 'error' : 'primary'"
            small
            @click="showCommentCreationForm = !showCommentCreationForm"
          >
            <v-icon left>
              {{ showCommentCreationForm ? 'close' : 'add_comment' }}
            </v-icon>

            {{
              showCommentCreationForm
                ? 'Скрыть форму'
                : (commentsLength === 0 ? 'Добавить первый комментарий!' : 'Комментировать пост')
            }}
          </v-btn>

          <v-expand-transition>
            <post-comment-creation-form
              v-if="showCommentCreationForm"
              v-model="newCommentContent"
              :post="post"
              @comment-created="onCommentCreated"
            />
          </v-expand-transition>
        </template>

        <!--:root-comments-per-page="rootCommentsPerPage"-->
        <post-comments
          :comments.sync="post.comments"
          :post="post"
          :is-root="true"
          :nested-lvl="0"
          :observable="observable"
          class="mt-3"
        />
      </v-container>
    </v-card>

    <!--
    <pre>
      {{ post }}
    </pre>
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import {
  ObservableInterface,
  PathGeneratorInterface,
  PostRepositoryInterface
} from '~/configs/dependencyInjection/interfaces'
import { CategoryInterface } from '~/apollo/schema/categories'
import { PostInterface } from '~/apollo/schema/posts'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import Tags from '~/components/posts/post/tags/Tags.vue'
import Rating from '~/components/rating/Rating.vue'
import User from '~/components/user/User.vue'
import PostCommentCreationForm from '~/components/posts/post/comments/PostCommentCreationForm.vue'
import { CommentInterface } from '~/apollo/schema/comments'

const PathGenerator = serviceContainer.get<PathGeneratorInterface>(TYPES.PathGeneratorInterface)
const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

@Component({
  name: 'PostPage',
  components: { PostCommentCreationForm, User, Tags, Rating },
  scrollToTop: true,
  head () {
    return {
      title: this.post.title,
      meta: [
        // https://blog.spotibo.com/meta-description-length/
        { content: `${this.post.content.slice(0, 150)}"`, name: 'description', hid: 'description' }
      ]
    }
  }
})
export default class extends Vue {
  @Prop(String) id!: string
  @Prop(String) slug!: string

  // @ts-ignore
  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface
  @Inject(TYPES.ObservableInterface) private observable!: ObservableInterface

  // @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public post!: PostInterface
  public showCommentCreationForm: boolean = false
  public newCommentContent: string = ''

  async asyncData ({ app, redirect, error, params: { id, slug } }) {
    const post = await fetchPost(id)

    if (!post) {
      return error({
        statusCode: 404,
        message: 'пост не найден'
      })
    }
    if (post.titleSlug !== slug) {
      redirect(getPostPath(post))
    }

    return {
      post
      // rootCommentsPerPage
    }
  }

  get ratingInfo () {
    return {
      value: this.post.ratingValue,
      positive: this.post.ratingValuePositive,
      negative: this.post.ratingValueNegative
    }
  }

  get commentsLength () {
    return this.post.comments.data.length
  }

  get nestedCommentsCount () {
    return this.post.comments.data.reduce((prev, curr: CommentInterface) => {
      return prev + curr.allRepliesCount + 1
    }, 0)
  }

  onUserClick () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'profile-user',
        params: {
          user: this.post.user.id.toString()
        }
      })
    )
  }

  async onCommentCreated () {
    this.post = (await fetchPost(this.id))!

    // не важно, на первой сттранице (на которой покажется добавленный комментарий) или другая, root комменты имеют desc
    // порядок, в отличие от вложенных (там важно сохранить порядок комментов)
    this.observable.emit('loadComments')
    this.showCommentCreationForm = false
  }

  getCategoryPath (category: CategoryInterface) {
    return this.pathGenerator.generate({
      name: 'category-with-path',
      params: {
        id: category.id.toString(),
        path: category.path.slice(1),
        page: '1'
      }
    })
  }
}

function getPostPath (post: PostInterface) {
  return PathGenerator.generate({
    name: 'post',
    params: {
      slug: post.titleSlug,
      id: post.id.toString()
    }
  })
}

async function fetchPost (id): Promise<PostInterface | null> {
  return PostRepo.getPost(id)
}
</script>

<template>
  <div class="w-100 h-100">
    <v-layout
      column
      align-center
      class="ma-auto"
    >
      <v-pagination
        v-model="page"
        :length="pages"
      />

      <v-progress-circular
        v-if="loading"
        :size="50"
        color="blue"
        class="ma-5"
        indeterminate
      />

      <v-container
        v-if="!loading"
        fluid
        grid-list-xl
      >
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            v-for="post in posts"
            :key="post.id"
            xs12
            sm6
            lg3
          >
            <post
              :post="post"
            />
          </v-flex>
        </v-layout>
      </v-container>

      <v-pagination
        v-if="!loading"
        v-model="page"
        :length="pages"
      />
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Watch } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import Post from '~/components/posts/Post'
import { GET_ALL_POSTS_QUERY } from '~/apollo/queries/posts/getAllPosts'

@Component({
  components: {
    Post
  }
})
export default class Posts extends Vue {
  async asyncData ({ app, params: { page }, error }) {
    page = +page

    try {
      return {
        ...await getByPage(page, app),
        page
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        error({ statusCode: 404, message: app.i18n.t('posts_page_error_404') })
      }
    }
  }

  public posts: any[] = []
  public loading: boolean = false
  public page: number | null = null
  public pages: number | null = null

  @Watch('page')
  async onPageChange (page: number) {
    this.$router.push(
      this.localePath({
        name: 'posts-page',
        params: { page: page.toString() }
      })
    )

    // TODO ActionWithLoading
    this.loading = true
    const { posts } = await getByPage(page, this)

    this.posts = posts
    this.loading = false
  }
}

async function getByPage (page: number = 1, context = this) {
  const {
    data: {
      allPosts: {
        data: posts,
        paginatorInfo: {
          lastPage: pages
        }
      }
    }
  } = await context.$apollo.query({
    query: GET_ALL_POSTS_QUERY,
    variables: {
      page
    }
  })

  return { posts, pages }
}
</script>

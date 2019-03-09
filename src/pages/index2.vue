<template>
  <section class="w-100 h-100">
    <nuxt-link :to="localePath({ name: 'posts-page', params: { page: 1 } })">
      Посты
    </nuxt-link>

    <pre>{{ allPosts }}</pre>

    <div v-if="allPosts">
      <div
        v-for="post in allPosts.data"
        :key="post.id"
      >
        <h4>
          {{ post.title }}
        </h4>
        <p>
          {{ post.content }}
        </p>
      </div>

      perPage: {{ allPosts.paginatorInfo.perPage }}
      total: {{ allPosts.paginatorInfo.total }}
    </div>

    <v-layout justify-center>
      <v-flex xs4>
        <apollo-mutation
          :mutation="CREATE_POST_MUTATION"
          :variables="{
            input
          }"
          @done="onDone"
        >
          <template slot-scope="{ mutate, loading, error }">
            <v-text-field
              v-model="input.title"
              label="Title"
              single-line
            />

            <v-text-field
              v-model="input.text"
              label="Text"
              single-line
            />
            <!--</v-flex>-->
            <!--mutate()-->
            <v-btn
              :loading="loading"
              color="primary"
              @click="mutate"
            >
              Создать пост
            </v-btn>
            <p v-if="error">
              An error occured: {{ error }}
            </p>
          </template>
        </apollo-mutation>
      </v-flex>
    </v-layout>
    <!--
    <v-btn @click="refetch">
      Refetch
    </v-btn>
    hello: <b>{{ hello }}</b>
    Global loading:
    $apollo.loading
    Local loading:
    $apollo.queries.hello.loading
    -->
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import { CREATE_POST_MUTATION } from '~/apollo/mutations/createPost'
import { GET_ALL_POSTS_QUERY } from '~/apollo/queries/posts/getAllPosts'

// import gql from 'graphql-tag'

@Component({
  data: () => ({
    allPosts: null
  }),
  // apollo: {
  //   hello: {
  //     query: gql`{hello}`
  //   }
  // }
  apollo: {
    // Simple query that will update the 'hello' vue property
    allPosts: {
      query: GET_ALL_POSTS_QUERY
    }
  }
})
export default class Home extends Vue {
  CREATE_POST_MUTATION = CREATE_POST_MUTATION

  // hello = 2

  input = {
    title: 'My title', // null,
    text: 'My text' // null
  }

  onDone (r) {
    console.log('done', r)
  }

  refetch () {
    this.$apollo.queries.hello.refetch()
  }

  // created () {
  //   this.$apollo.addSmartQuery('hello', {
  //     query: gql`{hello}`
  //   })
  // }
}
</script>

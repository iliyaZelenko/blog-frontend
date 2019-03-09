<template>
  <v-layout
    column
    align-center
    class="ma-auto"
  >
    <v-pagination
      :value="page"
      :length="pages"
      @input="$emit('page-change', arguments[0])"
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
        align-center
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
      :value="page"
      :length="pages"
      @input="$emit('page-change', arguments[0])"
    />
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import Post from '~/components/posts/Post'

@Component({
  components: {
    Post
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    }
  }
})
export default class PostsList extends Vue {
  // пришлось вынести: надо обращатся в классе
  @Prop(Array) posts!: any[]
}
</script>

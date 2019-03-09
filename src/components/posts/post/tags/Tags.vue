<template>
  <div>
    <v-chip
      v-for="tag of tagsTruncated"
      :key="'tag-' + tag.id"
    >
      <v-avatar class="teal white--text">
        {{ tag.name.slice(0, 1).toUpperCase() }}
      </v-avatar>

      <span class="body-1">
        {{ tag.name }}
      </span>
    </v-chip>

    <v-menu
      v-model="tagsShowRestMenu"
      :close-on-content-click="false"
      origin="center center"
      transition="scale-transition"
      offset-y
      left
    >
      <v-btn
        v-if="tagsTruncatedRemainder.length"
        slot="activator"
        color="primary"
        small
      >
        <v-icon left>
          more_horiz
        </v-icon>
        Show the rest
      </v-btn>

      <v-card>
        <v-card-text>
          <v-chip
            v-for="tag of tagsTruncatedRemainder"
            :key="'tag-remainder-' + tag.id"
          >
            <v-avatar class="teal white--text">
              {{ tag.name.slice(0, 1).toUpperCase() }}
            </v-avatar>

            <span class="body-1">
              {{ tag.name }}
            </span>
          </v-chip>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import { PostInterface } from '~/apollo/schema/posts'

@Component({
  name: 'PostTags'
})
export default class Tags extends Vue {
  @Prop(Object) post!: PostInterface

  public tagsShowRestMenu: boolean = false

  get tagsToDisplay () {
    return this.$breakpoint.is('smAndDown') ? 4 : 8
  }

  get tagsTruncated () {
    return this.post.tags.slice(0, this.tagsToDisplay + 1)
  }

  get tagsTruncatedRemainder () {
    return this.post.tags.slice(this.tagsToDisplay + 1)
  }
}
</script>

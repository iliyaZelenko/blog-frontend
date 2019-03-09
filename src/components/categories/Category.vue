<template>
  <div class="category">
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        style="height: 100%;"
      >
        <v-img
          :src="'https://picsum.photos/200?image=' + category.id"
          height="200px"
          class="category__img"
          @click="$emit('select', category)"
        >
          <div class="fill-height bottom-gradient" />
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">
              {{ category.name }}
            </div>
            <!--
            <span class="grey&#45;&#45;text">
              {{ category.description || 'No description given' }}
            </span>-->
          </div>
        </v-card-title>

        <v-card-text>
          Личных постов: {{ category.postsCount }}.
          Всего постов: {{ category.allPostsCount }}.
          Личных вложенных категорий: {{ category.childrenCount }}.
          Всего вложенных категорий: {{ category.allChildrenCount }}.
        </v-card-text>

        <v-card-actions>
          <!--
          <v-btn flat>
            Subscribe
          </v-btn>-->

          <v-btn
            :loading="exploreLoading"
            color="purple"
            flat
            @click="$emit('select', category); exploreLoading = true"
          >
            Explore
          </v-btn>

          <v-spacer />

          <v-btn
            v-if="category.description"
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
          <div
            v-else
            class="mr-3"
          >
            Нет описания
          </div>
        </v-card-actions>

        <v-expand-transition v-if="category.description">
          <div v-show="show">
            <v-card-text class="px-4">
              {{ category.description }}
              <!--<ul v-if="category.all_children.length">-->
              <!--<category-->
              <!--v-for="category of category.all_children"-->
              <!--:key="category.name"-->
              <!--:category="category"-->
              <!--/>-->
              <!--</ul>-->
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'Category',
  // components: {
  //   Category
  // },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false,
    exploreLoading: false
  })
}
</script>

<style lang="stylus">
  .category
    height 100%

  .category__img
    cursor pointer
</style>

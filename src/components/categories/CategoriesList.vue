<template>
  <!--<no-ssr placeholder="Loading...">-->
  <v-container
    class="teal lighten-4"
    grid-list-md
  >
    <v-layout
      style="min-height: 350px;"
      justify-center
      align-center
      row
      wrap
    >
      <template v-if="loadingCategory">
        <v-flex
          class="text-xs-center"
          shrink
        >
          <v-progress-circular
            :size="70"
            :width="5"
            color="primary"
            indeterminate
          />
          <div class="mt-3">
            Загрузка категори "<b>{{ loadingCategory.name }}</b>"...
          </div>
        </v-flex>
      </template>
      <template v-else>
        <v-flex
          v-for="category in categories"
          :key="category.name"
          xs3
        >
          <category
            :category="category"
            @select="$emit('select', category)"
          />
        </v-flex>
        <v-flex v-if="!categories.length">
          <v-img
            v-if="hasSearch"
            :height="350"
            :src="noCategoriesImage"
            class="app-border-all-round-mini"
          >
            <v-layout
              fill-height
              justify-center
              align-center
            >
              <v-flex shrink>
                <div class="display-2 error--text">
                  Не удалось найти нужных категорий :(
                </div>
              </v-flex>
            </v-layout>
          </v-img>
          <v-img
            v-else
            :height="350"
            :src="require('~/assets/backgrounds/md_paper.png')"
            class="app-border-all-round-mini"
          >
            <v-layout
              fill-height
              justify-center
              align-center
            >
              <v-flex shrink>
                <div class="display-2 white--text">
                  Нет вложенных категорий
                </div>
              </v-flex>
            </v-layout>
          </v-img>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import Category from '~/components/categories/Category.vue'

@Component({
  components: {
    Category
  },
  props: {
    loadingCategory: {
      type: Object,
      default: null
    },
    categories: {
      type: Array,
      required: true
    },
    hasSearch: {
      type: Boolean,
      default: false
    }
  }
})
export default class CategoriesList extends Vue {
  noCategoriesImage = require('~/assets/backgrounds/illustrations/md_oops.png')
}
</script>

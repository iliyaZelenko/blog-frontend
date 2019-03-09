<template>
  <v-toolbar
    color="teal"
    dark
  >
    <v-toolbar-title>
      {{ selectedCategory ? 'Выбор вложенной категории' : 'Выбор категории' }}
    </v-toolbar-title>

    <v-spacer />

    <!--v-model="search"-->
    <v-autocomplete
      v-show="hasSearch"
      :search-input.sync="searchLocal"
      :items="itemsSearch"
      :loading="loading"
      class="mx-3"
      label="Search by category"
      item-text="name"
      prepend-inner-icon="search"
      return-object
      solo-inverted
      hide-details
      flat
      @input="$emit('search-select', arguments[0])"
    />

    <v-spacer />

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { Watch, Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'

@Component({
  props: {
    itemsSearch: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    selectedCategory: {
      type: Object,
      default: null
    },
    hasSearch: {
      type: Boolean,
      required: true
    }
  }
})
export default class CategoriesToolbar extends Vue {
  // пришлось вынести: надо обращатся в классе
  @Prop(String) search!: string

  searchLocal: string = ''

  @Watch('searchLocal')
  onSearchChange () {
    this.$emit('update:search', this.searchLocal)
  }
}
</script>

<template>
  <v-breadcrumbs
    :items="items"
    divider="/"
    class="body-2"
  >
    <template
      slot="item"
      slot-scope="{ item }"
    >
      <span
        v-if="item.index === items.length - 1"
        class="grey--text"
      >
        {{ item.name }}
      </span>
      <a
        v-else
        @click="$emit('select', item)"
      >
        {{ item.name }}
      </a>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'

@Component({
  props: {
    items: {
      type: Array,
      required: true
    }
  }
})
export default class CategoriesBreadcrumbs extends Vue {
  //
}
</script>

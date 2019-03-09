<template>
  <!--@input="loadComments(comments.paginatorInfo.currentPage, perPage)"-->
  <v-autocomplete
    :value="value"
    :items="perPageItems"
    :search-input.sync="perPageItemsSearch"
    item-text="text"
    item-value="value"
    label="Комментов за страницу"
    required
    @keyup.enter="perPageItemAddNew"
    @input="$emit('input', arguments[0])"
  >
    <template slot="no-data">
      <v-list-tile>
        <template v-if="perPageItemsNoDataCanCreate">
          <span class="subheading">
            Создать выбор для
          </span>
          <v-chip
            color="lighten-3"
            label
            small
          >
            {{ perPageItemsSearch }}
          </v-chip>
        </template>
        <template v-else>
          Введите число и нажмите <kbd>Enter</kbd> чтобы создать
        </template>
      </v-list-tile>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'

@Component({
  name: 'PostCommentsPerPage'
})
export default class PostCommentsPerPage extends Vue {
  @Prop(Number) value!: number
  @Prop(Boolean) loading!: boolean

  public perPageItems = [
    // если value не совпадает с тем что в prop, то добавляется автоматически (created hook)
    {
      text: 'По 2',
      value: 2
    },
    {
      text: 'По 5',
      value: 5
    },
    {
      text: 'По 10',
      value: 10
    },
    {
      text: 'По 20',
      value: 20
    },
    {
      text: 'По 50',
      value: 50
    }
  ]
  public perPageItemsSearch: string = ''

  get perPageItemsNoDataCanCreate () {
    return !isNaN(+this.perPageItemsSearch)
  }

  created () {
    const value = this.value

    if (this.perPageItems.some(i => i.value === value)) return

    this.perPageItemsAddItem({
      text: 'По ' + value,
      value
    })
  }

  perPageItemsAddItem (item) {
    this.perPageItems.unshift(item)
    this.perPageItems.sort((a, b) => a.value - b.value)

    this.$emit('input', item.value)
  }

  async perPageItemAddNew () {
    if (!this.perPageItemsNoDataCanCreate) return

    this.perPageItemsAddItem({
      text: 'По ' + +this.perPageItemsSearch,
      value: +this.perPageItemsSearch
    })
  }
}
</script>

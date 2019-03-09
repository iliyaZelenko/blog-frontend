<template>
  <v-autocomplete
    :value="value"
    :items="items"
    :search-input.sync="search"
    item-text="text"
    item-value="value"
    label="Preview-комментов в root комментах"
    required
    @keyup.enter="addNewItem"
    @input="$emit('input', arguments[0])"
  >
    <template slot="no-data">
      <v-list-tile>
        <template v-if="canCreateNewItem">
          <span class="subheading">
            Создать выбор для
          </span>
          <v-chip
            color="lighten-3"
            label
            small
          >
            {{ search }}
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
  name: 'PostCommentPreviewCommentsCount'
})
export default class extends Vue {
  @Prop(Number) value!: number

  public items = [
    // если value не совпадает с тем что в prop, то добавляется автоматически (created hook)
    {
      text: 'Не отображать',
      value: 0
    },
    {
      text: 'По 1',
      value: 1
    },
    {
      text: 'По 2',
      value: 2
    },
    {
      text: 'По 3',
      value: 3
    },
    {
      text: 'По 5',
      value: 5
    },
    {
      text: 'По 7',
      value: 10
    }
  ]
  public search: string = ''

  get canCreateNewItem () {
    return !isNaN(+this.search)
  }

  created () {
    const value = this.value

    if (this.items.some(i => i.value === value)) return

    this.addItem({
      text: 'По ' + value,
      value
    })
  }

  addItem (item) {
    this.items.unshift(item)
    this.items.sort((a, b) => a.value - b.value)

    this.$emit('input', item.value)
  }

  async addNewItem () {
    if (!this.canCreateNewItem) return

    this.addItem({
      text: 'По ' + +this.search,
      value: +this.search
    })
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-icon
        large
        left
      >
        label
      </v-icon>
      <span class="display-1 font-weight-light">
        Облако тегов
      </span>

      <v-spacer />

      <v-btn
        color="primary"
        small
        @click="regenerate"
      >
        <v-icon left>
          refresh
        </v-icon>

        Перезагрузить
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div class="text-xs-center">
        <v-tooltip
          top
          :value="!!tagHoverText"
        >
          <span slot="activator">
            &zwnj;
          </span>
          <span>{{ tagHoverText }}</span>
        </v-tooltip>
      </div>

      <no-ssr>
        <tags-cloud-svg
          ref="tags"
          style="height: 350px;"
          :tags="filteredTags"
          :observer="tagsCloudSVGObserver"
          @tag-mouseover="tagHoverText = arguments[0].about"
          @tag-mouseout="tagHoverText = null"
          @tag-click="onTagCloudTagClick"
        />
      </no-ssr>

      <!--
      <v-expand-transition>
        <div
          v-if="tagHoverText"
          class="grey--text"
        >
          {{ tagHoverText }}
        </div>
      </v-expand-transition>
      -->

      <v-btn
        color="primary"
        @click="showFilters = !showFilters"
      >
        <v-icon left>
          filter_list
        </v-icon>

        {{ showFilters ? 'Hide filters' : 'Show filters' }}
      </v-btn>

      <v-expand-transition>
        <div
          v-if="showFilters"
          style="display: flex;"
          class="align-center"
        >
          <v-combobox
            v-model="selectedCategories"
            :items="tagsCategories"
            item-text="name"
            label="Фильтр по категориям"
            multiple
            chips
            @change="regenerate"
          />

          <v-btn
            color="primary"
            @click="selectedCategories = tagsCategories"
          >
            Выбрать все
          </v-btn>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import TagsCloudSVG from '~/components/tags/TagsCloudSVG.vue'

@Component({
  components: { 'tags-cloud-svg': TagsCloudSVG }
})
export default class TagsCloud extends Vue {
  @Prop(Array) tags!: any[]

  public tagHoverText: string | null = null
  public selectedCategories: any[] = []
  public tagsCloudSVGObserver = new Vue()
  public showFilters: boolean = false

  get tagsCategories () { // tags
    // const result: any[] = []
    //
    // this.tags.map(i => i.category).forEach(i => {
    //   if (result.some(ri => i.id === ri.id)) return
    //
    //   result.push(i)
    // })
    //
    // return result

    // [...new Set(this.tags.map(i => i.category))]
    return this.tags.map(i => i.category).filter((i, index, arr) => arr.indexOf(i) === index)
  }

  get selectedCategoriesIdArr () {
    return this.selectedCategories.map(i => i.id)
  }

  get filteredTags () {
    if (!this.selectedCategories.length) return this.tags

    return this.tags.filter(i =>
      this.selectedCategoriesIdArr.includes(i.id)
    )
  }

  regenerate () {
    this.tagsCloudSVGObserver.$emit('regenerate')

    // this.$nextTick(() => {
    //   // странно, но без таймера не работает
    //   setTimeout(() => {
    //     // @ts-ignore
    //     this.$refs.tags.generate()
    //   }, 500)
    // })
  }

  onTagCloudTagClick (tag) {
    alert(tag.name)
  }
}
</script>

<style lang="stylus">
  .tags-cloud
    .legend
      border: 1px solid #555555;
      border-radius: 5px 5px 5px 5px;
      font-size: 0.8em;
      margin: 10px;
      padding: 8px;

    .bld
      font-weight: bold;

    #tags-cloud__svg-wrapper
      width: 100%;
      height: 100%;
</style>

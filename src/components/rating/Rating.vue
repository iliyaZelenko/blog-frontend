<template>
  <div>
    <div>
      <small
        :class="{
          'green--text': info.positive >= 2,
        }"
      >
        {{ info.positive }}
      </small>

      <v-btn
        :small="isSmall"
        icon
      >
        <v-icon
          :small="isSmall"
          color="green"
        >
          thumb_up_alt
        </v-icon>
      </v-btn>

      <span
        :class="{
          'subheading': true,
          'green--text': info.value >= 2,
          'red--text': info.value <= -2
        }"
      >
        {{ info.value }}
      </span>

      <!--Отдельно сколько дизлайков, лайков и сколько в сумме, инфа по пользователям-->

      <v-btn
        :small="isSmall"
        icon
      >
        <v-icon
          :small="isSmall"
          color="red"
        >
          thumb_down_alt
        </v-icon>
      </v-btn>

      <small
        :class="{
          'red--text': info.negative >= 2
        }"
      >
        {{ info.negative }}
      </small>
    </div>

    <v-progress-linear
      :value="info.positive / info.negative * 100"
      :color="(info.positive / info.negative) === 1 ? 'grey' : 'success'"
      background-color="error"
      height="2"
      class="my-0"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import RatingInfoInterface from '~/components/rating/RatingInfoInterface'

@Component
export default class Rating extends Vue {
  @Prop(Object) info!: RatingInfoInterface
  @Prop({ default: false }) smButtons!: boolean

  get isSmall (): boolean {
    return this.smButtons
  }
}
</script>

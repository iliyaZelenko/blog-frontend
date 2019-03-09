<template>
  <div>
    <v-btn
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="path(locale)"
      color="primary lighten-1"
      size="mini"
      nuxt
    >
      <span class="mr-2">
        {{ locale.name }}
      </span>

      <img
        :src="`https://www.countryflags.io/${locale.flag}/shiny/24.png`"
        alt="flag"
      >
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'

@Component
export default class LocaleSwitcher extends Vue {
  path (locale) {
    return decodeURIComponent(
      this.switchLocalePath(locale.code)
    )
  }

  get availableLocales () {
    // @ts-ignore
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
  }
}
</script>

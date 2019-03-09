<template>
  <section class="w-100 h-100">
    <v-switch
      v-model="hideInternalRoutes"
      label="Скрыть внутренние роуты"
    />

    <div>
      <div
        v-for="route of filteredRoutes"
        :key="route.name"
      >
        <b>
          {{ route.name }}
        </b>

        {{ route.path }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import NoCache from '~/tools/decorators/ComputedNoCache.js'
import * as BackendRoutes from '~/store/modules/BackendRoutes'
// , State, Getter
import { namespace } from 'vuex-class'

const BackendRoutesModule = namespace(BackendRoutes.NAME)

@Component
export default class Routes extends Vue {
  hideInternalRoutes = true

  @NoCache
  get rand () {
    return new Date()
  }

  // computed
  get filteredRoutes () {
    const routes = this.routes

    if (this.hideInternalRoutes) {
      return routes.filter(i => i.name[0] !== '_')
    }

    return routes
  }

  // method
  getInfo () {
    alert(this.rand)
  }

  // (people.name)
  @BackendRoutesModule.State routes
}
</script>

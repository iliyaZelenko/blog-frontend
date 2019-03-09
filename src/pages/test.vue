<template>
  <div>
    123
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
const { FULL_API_GRAPHQL_URL } = global.appEnv

@Component
export default class extends Vue {
  async mounted () {
    console.log(FULL_API_GRAPHQL_URL)

    console.log('main',
      this.$get('graphql', {
        params: {
          query: `{ category(id: 1) { id } }`
        }
      })
    )
  }
}
</script>

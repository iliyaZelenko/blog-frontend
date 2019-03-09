<template>
  <div class="w-100 h-100">
    <auth />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import Auth from '~/components/debug/Auth.vue'

@Component({
  components: { Auth }
})
export default class Debug extends Vue {

}
</script>

<template>
  <!--app-->
  <v-navigation-drawer
    :value="value"
    :mini-variant="mini"
    temporary
    fixed
    app
    @input="$emit('input', arguments[0])"
  >
    <v-list class="pa-1">
      <v-list-tile
        v-if="mini"
        @click.stop="mini = !mini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        tag="div"
        avatar
      >
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list
      class="pt-0"
      dense
    >
      <v-divider light />

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard', to: this.localePath({ name: 'index' }) },
        { title: 'Routes', icon: 'question_answer', to: this.localePath({ name: 'routes' }) }
      ],
      mini: false,
      right: null
    }
  }
}
</script>

<template>
  <div>
    <v-container
      fluid
      grid-list-xl
    >
      <v-layout
        row
        wrap
        justify-center
      >
        <div v-show="loading">
          <v-progress-circular
            size="50"
            color="primary"
            indeterminate
          />
          <br><br>
          Loading...
        </div>

        <v-flex
          v-for="friend in friends"
          v-show="!loading"
          :key="friend.email"
          class="text-xs-center"
          xs4
          sm6
          md4
          lg3
          xl1
        >
          <router-link to="#">
            <!--<avatar-->
            <!--:src="friend.picture.medium"-->
            <!--size="80px"-->
            <!--/>-->
            <user-avatar
              :user="friend"
              size="80px"
            />

            <!--<img :src="friend.picture" class="profile__friend" width="100%">-->
            <div class="text-xs-center">
              <b>{{ friend.name.first }} {{ friend.name.last }}</b>
            </div>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center">
      <v-pagination
        v-show="!loading"
        v-model="currentPage"
        :length="20"
        :total-visible="8"
      />
    </div>
  </div>
</template>

<script>
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'

export default {
  components: { UserAvatar },
  props: {
    page: {
      type: [String, Number],
      default: 1
    }
  },
  data () {
    const pageProp = +this.page

    return {
      currentPage: pageProp,
      friends: null,
      loading: false
    }
  },
  computed: {
    perPage () {
      const perPageBreakpoint = {
        xs: 15,
        sm: 10,
        md: 10,
        lg: 15,
        xl: 36
      }

      for (let breakpoint in perPageBreakpoint) {
        if (this.$breakpoint.is(breakpoint)) {
          return perPageBreakpoint[breakpoint]
        }
      }

      throw new Error('No breakpoint found.')
    }
  },
  watch: {
    currentPage (page) {
      this.$router.replace({ name: 'profile-friends', params: { page } })
    }
  },
  mounted () {
    this.fetchFriends()
  },
  methods: {
    fetchFriends () {
      this.$actionWithLoading(async () => {
        const endpoint = `https://randomuser.me/api/?page=${this.currentPage}&results=${this.perPage}&seed=abc`
        const result = (await this.$get(endpoint)).results

        this.friends = result.map(i => ({
          ...i,
          avatar: {
            sm: i.picture.medium
          }
        }))
      }, 'loading')
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchFriends()
    next()
  }
}
</script>

<style>
  .profile__friend {
    border-radius: 10px;
    transform: rotate(0) scale(1);
    transition: .3s ease-in-out;
  }

  .profile__friend:hover {
    transform: rotate(2deg) scale(1.1);
  }
</style>

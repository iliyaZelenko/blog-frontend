<template>
  <div>
    <v-layout column>
      <v-card
        v-for="(post, i) in posts"
        :key="'post' + i"
        class="mb-4"
      >
        <v-card-title>
          <user-avatar
            :user="owner"
            size="80px"
          />

          <div class="ml-3">
            <b>{{ owner.nickname }}</b>
            <span class="pl-2 grey--text">
              {{ post.typeText }}
            </span>
            <br>
            <span class="grey--text">
              {{ post.publishedAt }}
            </span>
          </div>

          <v-spacer />

          <v-btn
            icon
            large
          >
            <v-icon color="green">
              thumb_up_alt
            </v-icon>
            <small>
              {{ post.thumbUp }}
            </small>
          </v-btn>
          <v-btn
            icon
            large
          >
            <v-icon color="red">
              thumb_down_alt
            </v-icon>
            <small>
              {{ post.thumbDown }}
            </small>
          </v-btn>
        </v-card-title>
        <v-card-text style="overflow-y: auto;">
          <div style="overflow: auto;">
            <p>
              {{ post.text }}
            </p>
            <div class="d-flex">
              <div
                v-for="photo in post.photos"
                :key="photo.src"
                class="ma-3"
                style="width: 50%"
              >
                <v-img
                  :aspect-ratio="16/9"
                  :src="photo.src"
                  lazy-src="http://sweettutos.com/wp-content/uploads/2015/12/placeholder.png"
                  class="elevation-2"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      color="grey lighten-5"
                      indeterminate
                    />
                  </v-layout>
                </v-img>
                <div class="font-weight-light grey--text title mt-3 text-xs-center">
                  {{ photo.caption }}
                </div>
              </div>
            </div>
          </div>
          <v-textarea
            class="mt-3"
            placeholder="Leave a comment"
            append-outer-icon="send"
            height="56"
            hide-details
            box
            single-line
            @click:append-outer="() => {}"
          />
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'

export default {
  name: 'ProfileActivityPosts',
  components: { UserAvatar },
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    posts: [
      {
        typeText: 'added text',
        publishedAt: '13.07.2018',
        thumbUp: 89,
        thumbDown: 5,
        text: `I am really grateful to the owner of this website
              who has shared this enormous post at at this place.`
      },
      {
        typeText: 'added text',
        publishedAt: '12.07.2018',
        thumbUp: 105,
        thumbDown: 3,
        text: `Everyone is the creator of one's own fate.`,
        photos: [
          {
            src: 'https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg',
            caption: 'My awesome first picture.'
          },
          {
            src: 'https://news.boyarka.name/uploads/posts/2013-05/1369718670_3.jpg',
            caption: 'And here my awesome second picture.'
          }
        ]
      },
      {
        typeText: 'added text and photos',
        publishedAt: '28.06.2018',
        thumbUp: 152,
        thumbDown: 10,
        text: `Hi everyone, it's my first go to see at this web page, and article
               is genuinely fruitful for me, keep up posting these articles or reviews.`
      }
    ]
  })
}
</script>

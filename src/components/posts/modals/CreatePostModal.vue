<template>
  <v-dialog
    :value="value"
    max-width="1000"
    @input="$emit('input', ...arguments)"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          Создание нового поста
        </span>

        <v-spacer />

        <v-btn
          class="ma-0"
          icon
          large
          @click="$emit('input', false)"
        >
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <span class="grey--text">
          Пост будет создан в текщей категории (<b>{{ category.name }}</b>)
        </span>

        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              ref="formTitle"
              v-model="form.title"
              v-validate="'required|' + $formValidator.rules.postTitle"
              :error-messages="errors.collect('postTitle')"
              data-vv-name="postTitle"
              label="Заголовок"
              required
            />
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="form.tags"
              v-validate="'required|' + $formValidator.rules.postTags"
              :error-messages="errors.collect('postTags')"
              data-vv-name="postTags"
              :items="tags"
              item-text="name"
              item-value="id"
              label="Теги"
              multiple
              attach
              chips
            />
          </v-flex>
          <v-flex xs12>
            <v-textarea
              v-model="form.contentShort"
              v-validate="'required|' + $formValidator.rules.postContentShort"
              :error-messages="errors.collect('postContentShort')"
              data-vv-name="postContentShort"
              label="Короткий контент"
              rows="1"
              auto-grow
            />
          </v-flex>
          <v-flex
            xs12
          >
            <v-textarea
              v-model="form.content"
              v-validate="'required|' + $formValidator.rules.postContent"
              :error-messages="errors.collect('postContent')"
              data-vv-name="postContent"
              label="Контент"
              rows="3"
              auto-grow
            />
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('input', false)"
        >
          Закрыть
        </v-btn>
        <v-btn
          :loading="loading"
          color="blue darken-1"
          flat
          @click="submitForm"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PostRepositoryInterface, PathGeneratorInterface, TagRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import { CategoryInterface } from '~/apollo/schema/categories'
import { TagInterface } from '~/apollo/schema/tags'
import { showServerError } from '~/tools/validator'
// import { validator } from '~/tools/validator'

@Component({
  components: {}
  // give me my own validator scope.
  // $_veeValidate: { validator: 'new' }
})
export default class CreatePostModal extends Vue {
  @Prop({ type: Boolean, required: true }) value!: boolean
  @Prop({ type: Object, required: true }) category!: CategoryInterface

  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface
  @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface
  @Inject(TYPES.TagRepositoryInterface) private tagRepo!: TagRepositoryInterface

  form: FormInterface = {
    tags: [],
    title: '',
    content: '',
    contentShort: ''
  }
  tags: TagInterface[] = []
  loading: boolean = false

  async mounted () {
    this.tags = await this.tagRepo.getAllTags()

    // @ts-ignore
    this.$refs.formTitle.focus()
  }

  async submitForm () {
    if (!await this.$validator.validate()) return

    const input = {
      ...this.form,
      categoryId: this.category.id,
      userId: this.$auth.user.id
    }

    this.loading = true

    try {
      const createdPost = await this.postRepo.createPost(input)

      this.$notify.success('Пост создан успешно!')

      // перенаправление на созданный пост
      this.$router.push(
        this.pathGenerator.generate({
          name: 'post',
          params: {
            id: createdPost.id.toString(),
            slug: createdPost.titleSlug
          }
        })
      )
      this.$emit('input', false)
    } catch (e) {
      showServerError(e, { iGraphQL: true })
    }

    this.loading = false
  }
}

interface FormInterface {
  tags: number[]
  title: string
  content: string
  contentShort: string
}
</script>

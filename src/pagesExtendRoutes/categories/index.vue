<template>
  <div class="w-100 h-100">
    <h1 class="display-1">
      {{ selectedCategory ? selectedCategory.name : 'Выбор категории' }}
    </h1>

    <p v-if="selectedCategory">
      {{ selectedCategory.description }}
    </p>

    <categories-breadcrumbs
      :items="breadcrumbs"
      @select="onSelectCategory"
    />

    <categories-toolbar
      :items-search="categoriesForSearch"
      :has-search="hasSearch"
      :loading="!!loadingCategory"
      :selected-category="selectedCategory"
      :search.sync="search"
      @search-select="onSelectCategory"
    />

    <categories-list
      :categories="categoriesFiltered"
      :loading-category="loadingCategory"
      :has-search="hasSearch"
      @select="onSelectCategory"
    />

    <template v-if="selectedCategory && !loadingCategory">
      <h1 class="mt-5">
        Посты категории
      </h1>

      <template v-if="selectedCategoryHasPosts">
        <p>
          <b>Постов на странице: </b> {{ selectedCategory.posts.paginatorInfo.count }}.
          <b>Постов всего: </b> {{ selectedCategory.posts.paginatorInfo.total }}.
        </p>

        <posts-list
          v-if="selectedCategoryHasPosts"
          :posts="selectedCategory.posts.data"
          :loading="loadingPosts"
          :page="selectedCategory.posts.paginatorInfo.currentPage"
          :pages="selectedCategory.posts.paginatorInfo.lastPage"
          @page-change="onPageChange"
        />
      </template>
      <v-alert
        v-else
        :value="true"
        type="info"
      >
        Категория не содержит постов.
      </v-alert>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Inject } from 'vue-inversify-decorator'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import CategoriesList from '~/components/categories/CategoriesList'
import CategoriesBreadcrumbs from '~/components/categories/CategoriesBreadcrumbs'
import CategoriesToolbar from '~/components/categories/CategoriesToolbar'
import PostsList from '~/components/posts/PostsList'
import { CategoryInterface } from '~/apollo/schema/categories'
import { TYPES } from '~/configs/dependencyInjection/types'
import {
  CategoryRepositoryInterface,
  PathGeneratorInterface,
  PostRepositoryInterface
} from '~/configs/dependencyInjection/interfaces'
import { serviceContainer } from '~/configs/dependencyInjection/container'

// это используется не только в классе, а в функции, потому что asyncData не имеет this
const PathGenerator = serviceContainer.get<PathGeneratorInterface>(TYPES.PathGeneratorInterface)

@Component({
  components: {
    CategoriesList, CategoriesBreadcrumbs, CategoriesToolbar, PostsList
  }
})
export default class Categories extends Vue {
  @Prop({ default: '' }) path!: string
  @Prop({ default: null }) id!: string | null
  @Prop({ default: '1' }) page!: string

  // @ts-ignore
  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface
  // @ts-ignore
  @Inject(TYPES.CategoryRepositoryInterface) private categoryRepo!: CategoryRepositoryInterface
  @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  // типо static (не имеет this)
  async asyncData ({ app, redirect, error, params: { path, id, page } }) {
    // app.$container
    const CategoryRepository = serviceContainer.get<CategoryRepositoryInterface>(TYPES.CategoryRepositoryInterface)
    const pathWithSlash = '/' + path

    if (id) {
      // Если передавать path, то так: decodeURIComponent(pathWithSlash)
      const category = await CategoryRepository.getCategory(id, +page)

      // console.log(category)

      if (!category) {
        return error({
          statusCode: 404,
          message: 'категория не найдена'
        })
      }

      const maxPage = category.posts.paginatorInfo.lastPage

      if (page > maxPage) {
        // TODO возможно просто page = posts.paginatorInfo.lastPage
        return error({
          statusCode: 404,
          message: `страница ${page} не существует, последняя страница: ${maxPage}`
        })
      }
      if (category.path !== pathWithSlash) {
        redirect(getCategoryPath(category))
      }

      return { selectedCategory: category, categories: [] }
    }

    return { categories: await CategoryRepository.getRootCategories() }
  }

  search: string | null = null
  selectedCategory: CategoryInterface | null = null
  loadingCategory: CategoryInterface | null = null
  loadingPosts: boolean = false
  categories: CategoryInterface[] = []
  breadcrumbsItemsStart = [
    {
      name: 'Главная',
      onClick () {
        // this.loading = true

        this.$router.push(
          this.pathGenerator.generate('index')
          // () => { this.loading = false }
        )
      }
    },
    {
      name: 'Категории',
      onClick () {
        location.href = this.pathGenerator.generate('categories')

        // this.$router.push не правильн оменяет страинцу, даже если обнулять состояние
        // this.$router.push(
        //   this.pathGenerator.generate('categories'),
        //   () => {
        //     this.selectedCategory = null
        //     getRootCategories.apply(this)
        //   }
        // )
      }
    }
  ]

  get selectedCategoryHasPosts (): boolean {
    return !!this.selectedCategory && !!this.selectedCategory.posts.paginatorInfo.total
  }

  get categoriesForSearch (): CategoryInterface[] {
    return this.selectedCategory ? this.selectedCategory.children : this.categories
  }

  get categoriesFiltered () {
    const arr = this.categoriesForSearch

    if (!this.search) return arr

    return arr.filter((i: CategoryInterface) =>
      i.name.toLowerCase().includes(
        // @ts-ignore Этой ошибки не должно быть
        this.search.toLowerCase()
      )
    )
  }

  get hasSearch (): boolean {
    return !!(this.categories.length || (this.selectedCategory && this.selectedCategory.haveChild))
  }

  get breadcrumbs () {
    const result = [...this.breadcrumbsItemsStart]

    if (this.selectedCategory) {
      // console.log('selectedCategory', this.selectedCategory)
      result.push(
        ...this.selectedCategory.ancestorsAndSelfInfo
      )
    }

    return result.map((item, i) => ({
      ...item,
      index: i
    }))
  }

  // хоть это и возвращает промис в лбом случае, но если писать Promise<PostsInterface>, то TSLint дает ошибку при =
  async getPostsByPage (page: number = 1) {
    if (!this.selectedCategory || !this.selectedCategory.id) {
      throw new Error('getPostsByPage требует чтобы this.selectedCategory была категорией')
    }

    return this.postRepo.getCategoryPosts(this.selectedCategory.id, page)
  }

  async onPageChange (newPage) {
    if (!this.selectedCategory) return

    this.loadingPosts = true
    // !!! Тут нет ошибки, IDE ошибается
    this.selectedCategory.posts = await this.getPostsByPage(newPage)
    this.loadingPosts = false

    this.$router.replace(
      getCategoryPath(this.selectedCategory, newPage)
    )
  }

  async onSelectCategory (category) {
    if (category.onClick) {
      category.onClick.apply(this)
    } else {
      const path = getCategoryPath(category)

      this.loadingCategory = category

      this.$router.push(path, () => {
        this.loadingCategory = null
      })
    }
  }
}

function getCategoryPath (category, page = '1') {
  return PathGenerator.generate({
    name: 'category-with-path',
    params: {
      path: category.path.slice(1),
      id: category.id,
      page
    }
  })
}
</script>

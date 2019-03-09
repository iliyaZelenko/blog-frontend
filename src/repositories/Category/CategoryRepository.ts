import { injectable } from 'inversify'
import CategoryRepositoryInterface from '~/repositories/Category/CategoryRepositoryInterface'
import { GET_CATEGORY_QUERY } from '~/apollo/queries/categories/getCategory'
import { CategoryInterface } from '~/apollo/schema/categories'
import { GET_ROOT_CATEGORIES_QUERY } from '~/apollo/queries/categories/getRootCategories'
import BaseRepository from '~/repositories/BaseRepository'

@injectable()
export default class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface {

  protected apollo // = global._$app.$apollo

  public constructor () {
    super()

    // this.apollo = global._$app.$apollo
  }

  // TODO сделать Entity, чтобы репозиторий возвращал Entity и заполнял Entity данными (А возможно не Entity, а просто DTO)
  public async getRootCategories (): Promise<CategoryInterface[]> {
    const { data: { rootCategories } } = await global._$app.$apollo.query({
      query: GET_ROOT_CATEGORIES_QUERY
    })

    return rootCategories
  }

  public async getCategory (id, page: number): Promise<CategoryInterface> {
    const { data: { category } } = await global._$app.$apollo.query({
      query: GET_CATEGORY_QUERY,
      variables: { id, page }
    })

    return category
  }
}

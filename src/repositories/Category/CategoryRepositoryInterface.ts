import { CategoryInterface } from '~/apollo/schema/categories'

export default interface CategoryRepositoryInterface {
  getRootCategories (): Promise<CategoryInterface[]>
  getCategory (id, page: number): Promise<CategoryInterface | null>
}

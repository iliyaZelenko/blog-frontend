import { TagInterface } from '~/apollo/schema/tags'

export default interface TagRepositoryInterface {
  getAllTags (): Promise<TagInterface[]>
}

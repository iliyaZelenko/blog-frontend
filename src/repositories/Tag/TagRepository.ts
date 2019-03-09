import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { TagInterface } from '~/apollo/schema/tags'
import TagRepositoryInterface from '~/repositories/Tag/TagRepositoryInterface'
import { GET_ALL_TAGS_QUERY } from '~/apollo/queries/tags/getAllTags'

@injectable()
export default class TagRepository extends BaseRepository implements TagRepositoryInterface {
  public async getAllTags (): Promise<TagInterface[]> {
    const { data: { tags } } = await global._$app.$apollo.query({
      query: GET_ALL_TAGS_QUERY
    })

    return tags
  }
}

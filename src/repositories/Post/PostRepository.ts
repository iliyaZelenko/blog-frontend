import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { GET_CATEGORY_POSTS_QUERY } from '~/apollo/queries/posts/getCategoryPosts'
import PostRepositoryInterface from '~/repositories/Post/PostRepositoryInterface'
import { PostInterface, PostsInterface } from '~/apollo/schema/posts'
import { GET_POST_QUERY } from '~/apollo/queries/posts/getPost'
import { GET_ALL_POSTS_QUERY } from '~/apollo/queries/posts/getAllPosts'
import { ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT, ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT } from '~/configs/app'

@injectable()
export default class PostRepository extends BaseRepository implements PostRepositoryInterface {
  public async getCategoryPosts (categoryId: number, page: number | undefined = 1): Promise<PostsInterface> {
    const {
      data: {
        category: {
          posts
        }
      }
    } = await global._$app.$apollo.query({
      query: GET_CATEGORY_POSTS_QUERY,
      variables: {
        page,
        id: categoryId
      }
    })

    return posts
  }

  public async getAll (page: number = 1): Promise<PostsInterface> {
    const { data: { allPosts } } = await global._$app.$apollo.query({
      query: GET_ALL_POSTS_QUERY,
      variables: { page }
    })

    return allPosts
  }

  public async getPost (
    id: number,
    commentsPerPage: number | undefined = ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT,
    repliesPreviewCount: number | undefined = ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT
  ): Promise<PostInterface> {
    const { data: { post } } = await global._$app.$apollo.query({
      query: GET_POST_QUERY({
        repliesPreviewCount
      }),
      variables: { id, commentsPerPage }
    })

    return post
  }
}

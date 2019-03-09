import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import CommentRepositoryInterface from '~/repositories/Comment/CommentRepositoryInterface'
import { GET_COMMENT_REPLIES_QUERY } from '~/apollo/queries/comments/getCommentReplies'
import { CommentCreationInputInterface, CommentsInterface } from '~/apollo/schema/comments'
import { GET_COMMENTS_BY_POST_QUERY } from '~/apollo/queries/comments/getCommentsByPost'
import { CREATE_COMMENT_MUTATION } from '~/apollo/mutations/comments/createComment'
import { GET_COMMENT_QUERY } from '~/apollo/queries/comments/getComment'
import { GET_COMMENT_REPLIES_ALL_QUERY } from '~/apollo/queries/comments/getCommentRepliesAll'
import {
  COMMENT_COMMENTS_REPLIES_ALL_PER_PAGE_DEFAULT,
  COMMENT_COMMENTS_REPLIES_PER_PAGE_DEFAULT,
  ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT,
  ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT
} from '~/configs/app'

@injectable()
export default class CommentRepository extends BaseRepository implements CommentRepositoryInterface {

  public async getCommentRepliesPaginated (
    commentId: number,
    repliesPage: number | undefined = 1,
    repliesPerPage: number | undefined = COMMENT_COMMENTS_REPLIES_PER_PAGE_DEFAULT
  ): Promise<CommentsInterface> {
    const {
      data: {
        comment: {
          repliesComments
        }
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENT_REPLIES_QUERY,
      variables: {
        id: commentId,
        repliesPage,
        repliesPerPage
      },
      // из-за кеширования повторный запрос возвращает старый результат. Пример повторного запроса: добавляется коммент
      // в другой коммент, после обновления обновляется список комментов через запрос, если еще раз так добавить то и
      // будет возвращен старый результат
      fetchPolicy: 'no-cache'
    })

    return repliesComments
  }

  public async getCommentRepliesAllPaginated (
    commentId: number,
    repliesPage: number | undefined = 1,
    repliesPerPage: number | undefined = COMMENT_COMMENTS_REPLIES_ALL_PER_PAGE_DEFAULT
  ): Promise<CommentsInterface> {
    const {
      data: {
        comment: {
          allNestedRepliesComments
        }
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENT_REPLIES_ALL_QUERY,
      variables: {
        id: commentId,
        repliesPage,
        repliesPerPage
      },
      // из-за кеширования повторный запрос возвращает старый результат. Пример повторного запроса: добавляется коммент
      // в другой коммент, после обновления обновляется список комментов через запрос, если еще раз так добавить то и
      // будет возвращен старый результат
      fetchPolicy: 'no-cache'
    })

    return allNestedRepliesComments
  }

  public async getComment (
    commentId: number
    // repliesPage: number | undefined = 1,
    // repliesPerPage: number | undefined = COMMENT_COMMENTS_REPLIES_PER_PAGE_DEFAULT
  ): Promise<CommentsInterface> {
    const {
      data: {
        comment
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENT_QUERY,
      variables: {
        id: commentId
        // repliesPage,
        // repliesPerPage
      },
      fetchPolicy: 'no-cache'
    })

    return comment
  }

  public async getCommentsPaginatedByPost (
    postId: number,
    page: number | undefined = 1,
    perPage: number | undefined = ROOT_COMMENTS_BY_POST_PER_PAGE_DEFAULT,
    repliesPreviewCount: number | undefined = ROOT_COMMENTS_REPLIES_PREVIEW_COUNT_DEFAULT
  ): Promise<CommentsInterface> {
    const {
      data: {
        comments
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENTS_BY_POST_QUERY({
        repliesPreviewCount
      }),
      variables: {
        postId,
        page,
        perPage
        // repliesPreviewCount
      },
      fetchPolicy: 'no-cache'
    })

    return comments
  }

  public async createComment (
    input: CommentCreationInputInterface
  ): Promise<CommentsInterface> {
    const {
      data: {
        createComment: createdComment
      }
    } = await global._$app.$apollo.mutate({
      mutation: CREATE_COMMENT_MUTATION,
      variables: { input }
    })

    return createdComment
  }
}

import { CommentCreationInputInterface, CommentsInterface } from '~/apollo/schema/comments'

export default interface CommentRepositoryInterface {
  getCommentRepliesPaginated (
    commentId: number,
    repliesPage?: number,
    repliesPerPage?: number
  ): Promise<CommentsInterface>

  getCommentsPaginatedByPost (
    postId: number,
    page?: number,
    perPage?: number,
    repliesPreviewCount?: number
  ): Promise<CommentsInterface>

  createComment (
    input: CommentCreationInputInterface
  ): Promise<CommentsInterface>

  getComment (
    commentId: number,
    repliesPage?: number,
    repliesPerPage?: number
  ): Promise<CommentsInterface>
}

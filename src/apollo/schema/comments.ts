import { PostInterface } from '~/apollo/schema/posts'
import { UserInterface } from '~/apollo/schema/users'

export interface CommentsInterface {
  data: CommentInterface[]
  paginatorInfo?: {
    count: number
    currentPage: number
    perPage: number
    total: number
    lastPage: number
  } | null
}

export interface CommentInterface {
  id: number
  createdAt: string
  updatedAt: string
  content: string
  ratingValue: number
  ratingValuePositive: number
  ratingValueNegative: number
  repliesCount: number
  allRepliesCount: number

  user: UserInterface
  post: PostInterface
  repliedComment: CommentInterface
  repliesComments: CommentsInterface
}

export interface CommentCreationInputInterface {
  postId: number
  userId: number
  commentId: number | null
  content: string
}

import { CategoryInterface } from '~/apollo/schema/categories'
import { TagInterface } from '~/apollo/schema/tags'
import { CommentsInterface } from '~/apollo/schema/comments'

export interface PostsInterface {
  data: PostInterface[]
  paginatorInfo: {
    lastPage: number
    currentPage: number
    count: number
    total: number
  }
}

export interface PostInterface {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  titleSlug: string
  contentShort: string
  ratingValue: number
  ratingValuePositive: number
  ratingValueNegative: number
  commentsCount: number
  user: {
    id: number
    nickname: string
    fullName: string
  }
  category: CategoryInterface
  tags: TagInterface[]
  comments: CommentsInterface
}

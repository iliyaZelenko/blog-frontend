import { PostsInterface } from '~/apollo/schema/posts'

export interface CategoryInterface {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  path: string
  children: any[]
  ancestorsAndSelfInfo: any
  haveChild: boolean
  // postsCount: number,
  // allPostsCount: number,
  posts: PostsInterface
}

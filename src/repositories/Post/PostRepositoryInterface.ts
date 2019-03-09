import { PostInterface, PostsInterface } from '~/apollo/schema/posts'

export default interface PostRepositoryInterface {
  getCategoryPosts (categoryId: number, page: number | undefined): Promise<PostsInterface>
  getAll (page?: number): Promise<PostsInterface>
  getPost (
    id: number,
    commentsPerPage?: number,
    repliesPreviewCount?: number
  ): Promise<PostInterface | null>
}

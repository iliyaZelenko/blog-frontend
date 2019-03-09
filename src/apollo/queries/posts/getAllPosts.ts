import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import PostFragment from '~/apollo/fragments/posts/PostFragment'
import PaginatorInfoFragment from '~/apollo/fragments/paginator/PaginatorInfoFragment'

export const GET_ALL_POSTS_QUERY = gql`
  ${defineFragment(PostFragment)}
  ${defineFragment(PaginatorInfoFragment)}

  query GetAllPostsQuery($page: Int = 1, $perPage: Int = 8) {
    allPosts (page: $page, count: $perPage) {
      data {
        ${useFragment(PostFragment)}
      }
      paginatorInfo {
        ${useFragment(PaginatorInfoFragment)}
      }
    }
  }
`

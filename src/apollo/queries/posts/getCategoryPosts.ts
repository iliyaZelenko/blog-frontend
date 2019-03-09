import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import PostFragment from '~/apollo/fragments/posts/PostFragment'
import PaginatorInfoFragment from '~/apollo/fragments/paginator/PaginatorInfoFragment'

export const GET_CATEGORY_POSTS_QUERY = gql`
  ${defineFragment(PostFragment)}
  ${defineFragment(PaginatorInfoFragment)}

  query GetCategoryQuery ($id: ID!, $page: Int = 1, $perPage: Int = 4) {
    category (id: $id) {
      id
      posts (count: $perPage, page: $page) {
        data {
          ${useFragment(PostFragment)}
        }
        paginatorInfo {
          ${useFragment(PaginatorInfoFragment)}
        }
      }
    }
  }
`

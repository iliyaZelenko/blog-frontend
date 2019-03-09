import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import CommentFragment from '~/apollo/fragments/comments/CommentFragment'
import PaginatorInfoFragment from '~/apollo/fragments/paginator/PaginatorInfoFragment'

export const GET_COMMENT_REPLIES_ALL_QUERY = gql`
  ${defineFragment(CommentFragment)}
  ${defineFragment(PaginatorInfoFragment)}

  query GetCommentRepliesAllQuery($id: ID!, $repliesPage: Int = 1, $repliesPerPage: Int!) {
    comment (id: $id) {
      # Важно передавать id: https://github.com/apollographql/apollo-client/issues/2510#issuecomment-343957704
      id
      allNestedRepliesComments (page: $repliesPage, count: $repliesPerPage) {
        data {
          ${useFragment(CommentFragment)}
        }
        paginatorInfo {
          ${useFragment(PaginatorInfoFragment)}
        }
      }
    }
  }
`

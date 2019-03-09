import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import CommentFragment from '~/apollo/fragments/comments/CommentFragment'

export const GET_COMMENT_QUERY = gql`
  ${defineFragment(CommentFragment)}

  query GetCommentQuery($id: ID!) {
    comment (id: $id) {
      ${useFragment(CommentFragment)}
    }
  }
`

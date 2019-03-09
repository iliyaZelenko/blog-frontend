import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import CommentFragment from '~/apollo/fragments/comments/CommentFragment'
import PaginatorInfoFragment from '~/apollo/fragments/paginator/PaginatorInfoFragment'

export const GET_COMMENTS_BY_POST_QUERY = ({ repliesPreviewCount }) => {
  const repliesComments = repliesPreviewCount ? `
    repliesComments (count: ${repliesPreviewCount}) {
      data {
        ${useFragment(CommentFragment)}
      }
    }
  ` : ''

  return gql`
    ${defineFragment(CommentFragment)}
    ${defineFragment(PaginatorInfoFragment)}

    # , $repliesPreviewCount: Int!
    query GetCommentsByPostQuery($postId: ID!, $page: Int = 1, $perPage: Int!) {
      comments (post_id: $postId, page: $page, count: $perPage) {
        data {
          ${useFragment(CommentFragment)}
          ${repliesComments}
        }
        paginatorInfo {
          ${useFragment(PaginatorInfoFragment)}
        }
      }
    }
  `
}

import gql from 'graphql-tag'
import { useFragment, defineFragment } from '~/apollo/fragments'
import CommentFragment from '~/apollo/fragments/comments/CommentFragment'
import PaginatorInfoFragment from '~/apollo/fragments/paginator/PaginatorInfoFragment'

// , $repliesPreviewCount: Int!
export const GET_POST_QUERY = ({ repliesPreviewCount }) => {
  const repliesComments= repliesPreviewCount ? `
    repliesComments (count: ${repliesPreviewCount}) {
      data {
        ${useFragment(CommentFragment)}
      }
    }
  ` : ''

  return gql`
    ${defineFragment(CommentFragment)}
    ${defineFragment(PaginatorInfoFragment)}

    query GetPostQuery($id: ID!, $commentsPage: Int = 1, $commentsPerPage: Int!) {
      post (id: $id) {
        id
        title
        titleSlug
        content
        ratingValue
        ratingValuePositive
        ratingValueNegative
        commentsCount
        user {
          id
          nickname
          fullName
          avatar {
            sm
            md
          }
          createdAt
          gender
          age
        }
        category {
          id
          name
          path
        }
        tags {
          id
          name
          about
        }
        comments (page: $commentsPage, count: $commentsPerPage) {
          data {
            ${useFragment(CommentFragment)}
            # первый уровень вложенности (превью комментариии)
            ${repliesComments}
          }
          paginatorInfo {
            ${useFragment(PaginatorInfoFragment)}
          }
        }
      }
    }
  `
}

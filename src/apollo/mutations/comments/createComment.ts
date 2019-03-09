import gql from 'graphql-tag'

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CommentCreationInput!) {
    createComment (input: $input) {
      id
      content
      createdAt
    }
  }
`

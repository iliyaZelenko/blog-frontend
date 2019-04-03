import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: PostCreationInput!) {
    createPost (input: $input) {
      id
      titleSlug
    }
  }
`

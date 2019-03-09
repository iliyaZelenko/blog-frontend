import gql from 'graphql-tag'

export const GET_ALL_TAGS_QUERY = gql`
  query GetAllTagsQuery {
    tags {
      id
      about
      name
      postsCount
      category {
        id
        name
      }
    }
  }
`

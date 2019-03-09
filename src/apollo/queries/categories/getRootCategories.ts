import gql from 'graphql-tag'

export const GET_ROOT_CATEGORIES_QUERY = gql`
  query GetRootCategories {
    rootCategories {
      id
      name
      description
      path
      postsCount
      allPostsCount
    }
  }
`

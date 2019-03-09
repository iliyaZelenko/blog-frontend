import gql from 'graphql-tag'

export const GET_AUTH_USER_QUERY = gql`
  query GetAuthUserQuery {
    me {
      id
      nickname
      fullName
      avatar {
        sm
      }
      createdAt
      gender
      age
    }
  }
`

import gql from 'graphql-tag'

export const GET_AUTH_USER_PROFILE_QUERY = gql`
  query GetAuthUserProfileQuery {
    me {
      id
      nickname
      fullName
      avatar {
        sm
        lg
      }
      gender
      age
      hasVerifiedEmail
      createdAt
    }
  }
`

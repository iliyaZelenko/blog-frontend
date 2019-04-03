import gql from 'graphql-tag'

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfileQuery ($id: ID!) {
    user (id: $id) {
      id
      email
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

import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { GET_AUTH_USER_QUERY } from '~/apollo/queries/auth/getAuthUser'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
import { UserInterface } from '~/apollo/schema/users'
import { GET_USER_PROFILE_QUERY } from '~/apollo/queries/user/profile/getUserProfile'
import { GET_AUTH_USER_PROFILE_QUERY } from '~/apollo/queries/user/profile/getAuthUserProfile'

@injectable()
export default class UserRepository extends BaseRepository implements UserRepositoryInterface {
  public async getAuthUser (): Promise<UserInterface> {
    const { data: { me } } = await global._$app.$apollo.query({
      query: GET_AUTH_USER_QUERY
    })

    return me
  }

  public async getUserProfile (id: number): Promise<UserInterface> {
    const { data: { user } } = await global._$app.$apollo.query({
      query: GET_USER_PROFILE_QUERY,
      variables: { id }
    })

    return user
  }

  public async getAuthUserProfile (): Promise<UserInterface> {
    const { data: { me } } = await global._$app.$apollo.query({
      query: GET_AUTH_USER_PROFILE_QUERY
    })

    return me
  }
}

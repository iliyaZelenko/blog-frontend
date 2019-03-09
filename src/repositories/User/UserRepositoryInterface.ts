import { UserInterface } from '~/apollo/schema/users'

export default interface UserRepositoryInterface {
  getAuthUser (): Promise<UserInterface>
  getUserProfile (id: number): Promise<UserInterface>
  getAuthUserProfile (): Promise<UserInterface>
}

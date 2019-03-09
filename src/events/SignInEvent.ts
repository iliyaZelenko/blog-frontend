import EventInterface from '~/events/EventInterface'

export default class SignInEvent implements EventInterface {
  public static readonly NAME = 'auth.sign_in'

  constructor (
    private loggedInResult: any
  ) {

  }

  public getLoggedInResult () {
    return this.loggedInResult
  }
}

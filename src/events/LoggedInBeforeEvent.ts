import EventInterface from '~/events/EventInterface'

export default class LoggedInBeforeEvent implements EventInterface {
  public static readonly NAME = 'auth.logged_in.before_auth'

  constructor (
    private tokenInfo
  ) {

  }

  public getTokenInfo (): { accessToken: string } {
    return this.tokenInfo
  }
}

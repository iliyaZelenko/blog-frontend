import { injectable } from 'inversify'
import ListenerInterface from '~/events/listeners/ListenerInterface'
import SignInEvent from '~/events/SignInEvent'

@injectable()
export default class SignInListener implements ListenerInterface<SignInEvent> {
  public handle (event: SignInEvent) {
    // const { user } = event.getLoggedInResult()

    // alert('Hello, ' + user.nickname)
  }
}

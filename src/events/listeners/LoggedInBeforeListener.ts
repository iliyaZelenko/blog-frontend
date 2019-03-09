import { injectable } from 'inversify'
import ListenerInterface from '~/events/listeners/ListenerInterface'
import LoggedInBeforeEvent from '~/events/LoggedInBeforeEvent'

@injectable()
export default class LoggedInBeforeListener implements ListenerInterface<LoggedInBeforeEvent> {
  public async handle (event: LoggedInBeforeEvent) {
    const token = event.getTokenInfo().accessToken

    return global._$app.$apolloHelpers.onLogin(token)
  }
}

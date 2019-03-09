import { injectable } from 'inversify'
import ListenerInterface from '~/events/listeners/ListenerInterface'
import LogoutEvent from '~/events/LogoutEvent'

@injectable()
export default class LogoutListener implements ListenerInterface<LogoutEvent> {
  public async handle (event: LogoutEvent) {
    await global._$app.$apolloHelpers.onLogout()

    global._$app.$notify.success('Logged out successfully.')
  }
}

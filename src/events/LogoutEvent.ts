import EventInterface from '~/events/EventInterface'

export default class LogoutEvent implements EventInterface {
  public static readonly NAME = 'auth.logout'
}

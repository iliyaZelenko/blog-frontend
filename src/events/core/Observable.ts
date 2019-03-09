import { injectable } from 'inversify'
import ObservableInterface from '~/events/core/ObservableInterface'
import bindListenersConfig from '~/configs/events/bindListeners'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import ListenerInterface from '~/events/listeners/ListenerInterface'
import listenerType from '~/events/core/ListenerType'

@injectable()
export default class Observable implements ObservableInterface {
  private listeners = {}

  public async emit<Event> (eventName: string, param?: Event | any) {
    const thisEventListeners = bindListenersConfig.listeners[eventName]

    if (thisEventListeners) {
      // Уведомляет класс-слушателей
      for (const listener of thisEventListeners) {
        // без шаблонной строки `${listener}` быдет предупреждение
        const classListener = require(`~/events/listeners/${listener}`).default
        let instance: ListenerInterface<any>

        if (!serviceContainer.isBound(classListener.name)) {
          serviceContainer.bind(classListener.name).to(classListener)
        }

        instance = serviceContainer.get<ListenerInterface<any>>(classListener.name)

        return instance.handle(param)
      }
    } else { // Уведомляет локальных слушателей
      if (!this.listeners[eventName]) return

      for (const listener of this.listeners[eventName]) {
        listener(param)
      }
    }
  }

  public async on (eventName: string, listener: listenerType) {
    if (!this.listeners[eventName]) this.listeners[eventName] = []

    this.listeners[eventName].push(listener)
  }

  public async removeListener (eventName: string, listener: listenerType) {
    this.listeners[eventName] = this.listeners[eventName].filter(i => i !== listener)
  }
}

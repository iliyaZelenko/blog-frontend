import { injectable } from 'inversify'

@injectable()
export default class BaseRepository {
  // Странно, но не работает (на момент выполнения кода nuxt не инициализирован, но когда выполняешь метод то работает)
  // protected static apollo = global._$app.$apollo
}

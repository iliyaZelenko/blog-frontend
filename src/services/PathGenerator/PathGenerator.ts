import { RawLocation } from 'vue-router/types/router'
import { injectable } from 'inversify'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'

@injectable()
export default class PathGenerator implements PathGeneratorInterface {
  /**
   * Возвращает href
   */
  public generate (location: RawLocation): string {
    if (this.routeExists) {
      return decodeURIComponent(
        global._$app.localePath(location)
      )
    }

    throw Error('Route not found!')
    // router.resolve({ name, params })
  }

  /**
   * Существует ли роут
   */
  public routeExists (location: RawLocation): boolean {
    return this.generate(location) === '/'
    // console.log(global._$app.router.options.routes)
    // router.resolve({ name, params })
  }
}

import { injectable, inject } from 'inversify'
import ScrollInterface from '~/services/Scroll/ScrollInterface'
import { ObservableInterface } from '~/configs/dependencyInjection/interfaces'
import { TYPES } from '~/configs/dependencyInjection/types'

/**
 * Browser-side only class. Works with scroll.
 */
@injectable()
export default class Scroll implements ScrollInterface {
  @inject(TYPES.ObservableInterface) public observer!: ObservableInterface
  // private _scrolled: number = process.browser ? window.pageYOffset : 0

  constructor () {
    // if (!process.browser) return

    window.addEventListener('scroll', () => {
      // this._scrolled = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
      const scrolled = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      this.observer.emit('scroll', scrolled)
    })
  }

  // public get scrolled (): number {
  //   return this._scrolled
  // }
}

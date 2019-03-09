import { serviceContainer } from '~/configs/dependencyInjection/container'

export default ({ }, inject) => {
  inject('container', serviceContainer)
}

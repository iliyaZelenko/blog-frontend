import { createDecorator } from 'vue-class-component'

export default createDecorator((options, key) => {
  if (options.computed) {
    options.computed[key].cache = false
  }
})

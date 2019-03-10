import * as env from '~/../env'

global.appEnv = env

export default ({ app }) => {
  if (process.server) {
    global._$app = app
  } else {
    window._$app = app
    global._$app = app
  }
}

import { join } from 'path'
const { CONFIGS_DIR } = global.appEnv

const extendRoutes = require(`${join(CONFIGS_DIR, 'routing/extendRoutes.ts')}`).default

export default {
  extendRoutes,
  middleware: ['globalAuth', 'globalRouteMeta']
}

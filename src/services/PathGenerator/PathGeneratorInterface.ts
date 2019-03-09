import { RawLocation } from 'vue-router/types/router'

export default interface PathGeneratorInterface {
  generate (location: RawLocation): string
  routeExists (location: RawLocation): boolean
}

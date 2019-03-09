import { types } from '~/store/root'

export default function ({ route, store }) {
  // Take the last value (latest route child)
  const metaObj = route.meta.reduce((accumulator, meta) => ({ ...accumulator, ...meta }))

  // console.log('Meta: ', metaObj)

  store.commit(types.SET_META, metaObj)
}

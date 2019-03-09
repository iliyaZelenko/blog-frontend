import ru from './ru/index'
import en from './en/index'

import { en as validatorEN, ru as validatorRU } from './validator'

export default {
  en: {
    // merge
    ...en,
    ...validatorEN.attributes
  },
  ru: {
    // merge
    ...ru,
    ...validatorRU.attributes
  }
}

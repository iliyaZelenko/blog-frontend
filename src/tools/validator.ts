// TODO перенести этот файл в сам файл плагина и от туда импортировать
import { Validator } from 'vee-validate'
// import { vp } from '~/tools/helpers'

export const nicknameMaxSymbols = 32

// Прежде чем ставить required| в правила какому-то полю,
// подумайте будет ли использоваться похожее правило но без required|
export const rules = {
  name: 'required|alpha_spaces|max:30',
  // firstName: 'alpha|min:3|max:10',
  // lastName: 'alpha|min:3|max:15',
  nickname: { required: true, regex: '^[а-яА-Яa-zA-ZЁё][а-яА-Яa-zA-Z0-9Ёё]*?([-_.][а-яА-Яa-zA-Z0-9Ёё]+){0,3}$', min: 3, max: nicknameMaxSymbols },
  // nicknameOrEmail: 'required',
  email: 'email',
  // emailLabel: 'min:3|max:20', // alpha_spaces
  // phoneLabel: 'min:3|max:20',
  password: 'required|min:5',
  commentMessage: 'required|min:5', // |minLengthWithoutTags:10|maxLengthWithoutTags:2000
  postTitle: 'min:5|max:150',
  postTags: '',
  postContentShort: 'min:10|max:600',
  postContent: 'min:15|max:10000'
  // phone: 'numeric|min:9|max:15',
  // topics
  // 'topic-title': 'required|alpha_spaces|min:10|max:150',
  // 'topic-description': 'required', // |minLengthWithoutTags:150|maxLengthWithoutTags:3500
  // posts
  // 'post-message': 'required' // |minLengthWithoutTags:10|maxLengthWithoutTags:2000
}

// TODO убрать new Validator
export const validator: Validator = Validator.create(rules, {})

interface ShowServerErrorOptionsInterface {
  iGraphQL: boolean
}

// Показывает ошибки бекенда (сервера). Для GraphQL своя абработка ошибок.
export function showServerError (response, { iGraphQL }: ShowServerErrorOptionsInterface = { iGraphQL: false }) {
  // дефолтная ошибка (не замечал что она показывалась хоть когда-то)
  let message = 'Неизвестная ошибка'

  if (iGraphQL) { // вот какой объект https://i.imgur.com/ugfeSMK.png
    const validationErrors = response.graphQLErrors
    let validationErrorsToDisplay = {}
    message = ''

    validationErrors.forEach(i => {
      if (i.hasOwnProperty('extensions') && i.extensions.hasOwnProperty('errors')) {
        validationErrorsToDisplay = {
          ...validationErrorsToDisplay,
          ...i.extensions.errors
        }
      } else {
        const indexOfUserMessage = i.message.indexOf('Expected')

        message += (indexOfUserMessage ? i.message.slice(indexOfUserMessage) : i.message) + '<br>'
      }
    })

    // это может перезаписать message (сделал чтобы оно было в приоритете)
    if (Object.keys(validationErrorsToDisplay).length) {
      message = ''

      for (const field in validationErrorsToDisplay) {
        if (validationErrorsToDisplay.hasOwnProperty(field)) {
          for (const error of validationErrorsToDisplay[field]) {
            message += `${error}<br>`
          }
        }
      }
    }
  } else { // if not GraphQL
    const { data } = response
    const { errors } = data

    if (errors) {
      message = ''

      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          for (const error of errors[field]) {
            message += `${error}<br>`
          }
        }
      }
    } else if (data.message) {
      message = data.message
    } else {
      message = data
    }
  }

  global._$app.$notify.error(message)
}

export function validatorSwitchLocale (locale) {
  const veeValidateLocale = require('vee-validate/dist/locale/' + locale)

  // TODO Validator.localize(locale, veeValidateLocale)
  validator.localize(locale, veeValidateLocale)
}

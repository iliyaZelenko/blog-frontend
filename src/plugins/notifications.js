// методы объекта $notify
const options = ['success', 'error', 'info', 'warn']
// объект который будет инджектится в Nuxt
const $notify = {}
// сообщения появившиеся на сервере. Должны показаться в браузере, при клиентском рендеринге.
const serverMessages = []

for (let type of options) {
  $notify[type] = (title, message = '', { timeout = 3000 } = {}) => {
    if (process.browser) {
      showBrowserMsg({ title, message, type, timeout })
    } else {
      addServerMsg({ title, message, type, timeout })
    }
  }
}

// Сразу показывает сообщение в браузере
function showBrowserMsg ({ title, message, type, timeout }) {
  // require внутри этой ф-ии, а не через import, чтобы не было ошибок в SSR
  const iziToast = require('izitoast')
  require('izitoast/dist/css/iziToast.min.css')

  if (type === 'warn') type = 'warning'

  return iziToast[type]({ title, message, timeout })
}

// Добавляет сообщение сервера
function addServerMsg ({ title, message, type, timeout }) {
  serverMessages.push({ title, message, type, timeout })
  global._$app.$cookies.set('showMessagesInBrowser', serverMessages)
}

export default ({ store, app }, inject) => {
  inject('notify', $notify)
}

export default {
  listeners: {
    'auth.sign_in': [
      'SignInListener'
    ],
    'auth.logged_in.before_auth': [
      'LoggedInBeforeListener'
    ],
    'auth.logout': [
      'LogoutListener'
    ]
  }
}

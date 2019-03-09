export default ({ store, app }, inject) => {
  inject('apollo', app.apolloProvider.defaultClient)
}

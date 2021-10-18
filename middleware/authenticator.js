export default ({ store, route, redirect }) => {
  if (
    !store.getters.isAuthenticated &&
    !(route.name === 'login' || route.name === 'signup')
  ) {
    redirect('/login')
  }
  if (store.getters.isAuthenticated && route.name === 'login') {
    redirect('/books')
  }
}

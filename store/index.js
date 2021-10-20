import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase.js'
const db = firebase.firestore()

const bookItemsArrayRef = db.collection('bookItemsArray')

export const state = () => ({
  userUid: '',
  userName: '',
  bookItemsArray: [],
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  addBookData(state, Item) {
    state.bookItemsArray.push(Item)
  },
  clearBookData(state) {
    state.bookItemsArray = []
  },
}

export const actions = {
  googleLogin({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
      })
      .then(() => {
        this.$router.push({
          name: 'books',
        })
      })
      .catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
  emailLogin({ commit }, { Email, Pass }) {
    auth
      .signInWithEmailAndPassword(Email, Pass)
      .then((result) => {
        const user = result.user
        console.log('覗き見', user)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
      })
      .then(() => {
        alert('ログインしました')
        router.push({ name: 'books' })
      })

      .catch((err) => {
        alert(err.message)
      })
  },
  signOut() {
    // レンダリングしていない、てかログアウトアクションが即時に動いていない
    auth
      .signOut()
      .then(() => {
        console.log('ログアウトしました')
      })
      .then(() => {
        this.$router.push({
          name: 'login',
        })
      })
      .catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
  addBookData(_, Item) {
    bookItemsArrayRef
      .add({
        bookItem: Item.bookItem,
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  },
}
export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getCurrentUserEmail(state) {
    // TODO:修正
    return state.curreId
  },
  isAuthenticated(state) {
    return !!state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getBookItems(state) {
    return state.bookItemsArray
  },
  isSignedIn(state) {
    return state.userUid !== ''
  },
}

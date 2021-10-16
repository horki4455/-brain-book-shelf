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
  login({ commit }) {
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
        var errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
  signOut() {
    return auth.signOut()
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
  user(state) {
    return state.userUid
  },
}

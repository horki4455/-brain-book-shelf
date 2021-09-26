import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase.js'
const db = firebase.firestore()

const todoRef = db.collection('todos')

export const state = () => ({
  userUid: '',
  userName: '',
  todos: [],
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  clearTodo(state) {
    state.todos = []
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
          name: 'chatspace',
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
  addTodo({ commit }, todo) {
    todoRef
      .add({
        limit: todo.limit,
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
  getTodos(state) {
    return state.todos
  },
  isSignedIn(state) {
    return state.userUid !== ''
  },
  user(state) {
    return state.userUid
  },
}

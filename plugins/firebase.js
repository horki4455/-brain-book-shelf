import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAuPpUz57cUj-SKjoa7bU1QhTjyTOEaV5I',
    authDomain: 'brain-bookshalf.firebaseapp.com',
    projectId: 'brain-bookshalf',
    storageBucket: 'brain-bookshalf.appspot.com',
    messagingSenderId: '970100568710',
    appId: '1:970100568710:web:7b54ed2054b43c697f5707',
  })
}
export const init = firebase.auth()

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase

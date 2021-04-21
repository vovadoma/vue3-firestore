import firebase from '../firebase'
import store from '../store/auth'

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store().commit('LOGIN', { uid: user.uid, email: user.email })
  } else {
    store().commit('LOGOUT')
  }
})

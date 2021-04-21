import firebase from './firebase'
export const db = firebase.firestore()
// if (location.hostname === 'localhost') {
//   db.useEmulator('localhost', 8081)
// }
export default db

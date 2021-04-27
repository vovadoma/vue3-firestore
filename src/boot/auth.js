import firebase from "../firebase";
import store from "../store/store";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit("auth/setUser", { uid: user.uid, email: user.email });
  } else {
    store.commit("auth/logout");
  }
});
export default firebase;

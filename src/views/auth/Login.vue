<template>
  <div class="row justify-center absolute-center full-width">
    <q-form
      @submit.prevent="userLogin"
      class="col-xs-11 col-sm-5 col-md-5 col-lg-3 col-xl-3  text-center q-gutter-lg"
    >
      <q-input type="email" v-model="formData.email" outlined dense placeholder='email' />
      <q-input type="password" v-model="formData.password" outlined dense placeholder='password' />
      <q-btn type="submit">Login</q-btn>
    </q-form>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import firebase from "../../firebase";
  export default {
    data() {
      return {
        formData: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
    ...mapActions("auth", ["login"]),
    userLogin() {
    firebase.auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
    .then((userCredential) => {
    let user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid
    };
    this.login(user).then(()=>{
      this.$router.push('/admin')
    })
    }).catch((error) => {
    let errorCode = error.code;
    console.log('~ errorCode', errorCode)
    let errorMessage = error.message;
    console.log('~ errorMessage', errorMessage)
    // ..
  });
      },
    },
  };
</script>

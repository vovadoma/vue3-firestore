<template>
  <q-toolbar>
    <q-btn flat v-if="user" :to="{ path: '/admin' }">ADMIN</q-btn>
    <q-space />
    <div v-if="user">
      <q-btn @click="logoutUser">Logout</q-btn>
    </div>
    <div v-else>
      <q-tabs>
        <q-route-tab to="/signin" exact label="Sign In" no-caps />
        <q-route-tab to="/login" label="Log In" exact no-caps />
      </q-tabs>
    </div>
  </q-toolbar>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import firebase from "firebase";
  export default {
    computed: {
      ...mapState("auth", ["user"]),
    },
    methods: {
      ...mapMutations("auth", ["logout"]),
      logoutUser() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push("/login");
            this.logout();
          });
      },
    },
  };
</script>

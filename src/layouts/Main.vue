<template>
  <q-layout>
  <q-header elevated>
    <Header />
  </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import Header from "../components/Header";
  export default {
    props: ["to"],
    components: {
      Header,
    },
    methods: {},
  };
</script>

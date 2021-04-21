<template>
  <q-header elevated>
      <q-toolbar>
        <q-btn
        v-for="t in to"
        :key='t.name'
        :label="t.name"
        dense
        flat
        :to="t.path"
        class="q-mx-sm"
        />
        <!-- <q-btn
        v-if='!window.location.href.includes("personalia")'
        label="Personalia"
        dense
        flat
        to="/personalia"
        class="q-mx-sm"
        /> -->
        <q-space />
        <slot name='search'></slot>
        <slot name="date"></slot>
        <div>
          <q-btn @click="logout">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script>
import firebase from 'firebase'
export default {
  props: ['to'],
  methods: {
    logout () {
      firebase.auth().signOut()
      this.$router.push('/login')
    }
  }
}
</script>

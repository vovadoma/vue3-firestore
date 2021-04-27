import { createStore } from 'vuex'

import auth from './auth'
import admin from './admin'
// Create a new store instance.
export default createStore({
    modules: {
        auth,
        admin
    },
})

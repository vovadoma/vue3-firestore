import { createStore } from 'vuex'

import auth from './auth'
// Create a new store instance.
export default createStore({
    modules: {
        auth
    },
})

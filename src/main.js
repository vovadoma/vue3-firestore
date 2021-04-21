import { createApp } from 'vue'
import store from "../src/store/store"
import router from "./router"
import quasar from 'quasar'

import Main from "./layouts/Main"

const app = createApp(Main)
app.use(store)
app.use(router)
app.use(quasar)
app.mount('#app')

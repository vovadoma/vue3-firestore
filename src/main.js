import { createApp } from 'vue'
import store from "./store"
import router from "./router"

import Main from "./layouts/Main"

const app = createApp(Main)
app.use(store)
app.use(router)
app.mount('#app')

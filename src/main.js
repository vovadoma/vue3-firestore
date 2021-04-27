import { createApp } from 'vue'
import store from "../src/store/store"
import router from "./router"
import App from "./App"
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Quasar, quasarUserOptions)
app.mount('#app')

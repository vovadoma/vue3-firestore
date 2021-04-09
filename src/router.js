import { createRouter, createWebHashHistory } from 'vue-router'

import App from "./pages/App"

const routes = [
    { path: '/', component: App },
    { path: '/:catchAll(.*)*', component: () => import('./pages/Error404.vue')}
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})

import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { name: 'signin', path: '/signin', component: () => import('./pages/auth/SignIn') },
    { path: '/:catchAll(.*)*', component: () => import('./pages/Error404.vue') }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})

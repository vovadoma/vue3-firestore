/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import Main from "./layouts/Main.vue";
import store from "../src/store/store";

const ifAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        name: "signin",
        path: "/signin",
        component: () => import("./views/auth/SignIn"),
      },
      {
        name: "login",
        path: "/login",
        component: () => import("./views/auth/Login"),
      },
      {
        name: "admin",
        path: "/admin/:collect?",
        component: () => import("./views/Admin"),
        beforeEnter: ifAuthenticated,
      },

      {
        name: "404",
        path: "/:catchAll(.*)*",
        component: () => import("./views/Error404.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

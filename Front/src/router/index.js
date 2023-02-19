import { createRouter, createWebHistory } from "vue-router";
import signin from "../views/signin.vue";
import signup from "../views/signup.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/signup",
      name: "signup",
      component: signup,
    },

    {
      path: "/signin",
      name: "signin",
      component: signin,
    },
  ],
});

export default router;

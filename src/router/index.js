import { createRouter, createWebHistory } from "vue-router";
import signin from "../components/signin.vue";
import signup from "../components/signup.vue";
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

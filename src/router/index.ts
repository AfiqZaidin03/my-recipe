import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Favourite from "../views/Favourite.vue";
import RecipeForm from "../components/RecipeForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favourite,
  },
  {
    path: "/recipe/new",
    name: "RecipeForm",
    component: RecipeForm,
  },
  {
    path: "/recipe/:name?/edit",
    name: "RecipeForm",
    component: RecipeForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

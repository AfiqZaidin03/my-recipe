import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import { useRecipeStore } from "./store/recipeStore";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 5000,
  position: "top-right",
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
});

const recipeStore = useRecipeStore();
recipeStore.initializeStore();
app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import { useRecipeStore } from "./store/recipeStore";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const recipeStore = useRecipeStore();
recipeStore.initializeStore();
app.mount("#app");

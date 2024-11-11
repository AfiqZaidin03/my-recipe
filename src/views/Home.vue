<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 pl-4 md:pl-0">Recipes</h1>
    <div class="p-4 md:p-0 mb-4 flex justify-between items-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        @click="(event) => goToRecipeForm(event)"
        class="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Recipe
      </button>
    </div>
    <div
      class="p-4 md:p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.name"
        :recipe="recipe"
        @click="(event) => goToRecipeForm(event, recipe.name)"
      ></RecipeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import RecipeCard from "../components/RecipeCard.vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "../store/recipeStore";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const recipeStore = useRecipeStore();
const searchQuery = ref("");

onMounted(() => {
  recipeStore.fetchRecipes();
});

const filteredRecipes = computed(() => {
  return recipeStore.recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.recipeIngredient.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
  );
});

const goToRecipeForm = (event: MouseEvent, name?: string) => {
  event.preventDefault();
  if (name) {
    router.push({ name: "RecipeForm", params: { name } });
  } else {
    router.push({ name: "RecipeForm" });
  }
};
</script>

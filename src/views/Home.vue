<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Recipes</h1>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.name"
        :recipe="recipe"
        @click="goToRecipeDetails(recipe.name)"
      ></RecipeCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import RecipeCard from "../components/RecipeCard.vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "../store/recipeStore";

export default defineComponent({
  name: "Home",
  components: {
    RecipeCard,
  },
  setup() {
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

    const goToRecipeDetails = (name: string) => {
      router.push({ name: "RecipeDetails", params: { name } });
    };

    return {
      searchQuery,
      filteredRecipes,
      goToRecipeDetails,
    };
  },
});
</script>

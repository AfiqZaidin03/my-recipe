<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Favorite Recipes</h1>
    <div
      v-if="favorites.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <RecipeCard
        v-for="recipe in favorites"
        :key="recipe.name"
        :recipe="recipe"
        @click="goToRecipeDetails(recipe.name)"
      ></RecipeCard>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-2xl text-gray-600">
        You haven't added any favorite recipes yet.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "../store/recipeStore";
import RecipeCard from "../components/RecipeCard.vue";

export default defineComponent({
  name: "Favorites",
  setup() {
    const router = useRouter();
    const recipeStore = useRecipeStore();
    const favorites = computed(() => recipeStore.favorites);

    const goToRecipeDetails = (name: string) => {
      router.push({ name: "RecipeDetails", params: { name } });
    };

    return {
      favorites,
      goToRecipeDetails,
    };
  },
});
</script>

<style scoped></style>

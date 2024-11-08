<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <img
      v-if="recipe.image && recipe.image.length > 0"
      :src="recipe.image[0]"
      :alt="recipe.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold mb-2">{{ recipe.name }}</h2>
        <button @click="toggleFavorite" class="text-2xl">
          {{ isRecipeFavorite ? "❤️" : "🤍" }}
        </button>
      </div>
      <p class="text-blue-600 mb-4 font-light">
        By {{ recipe.author?.name || "Unknown" }}
      </p>
      <p class="text-gray-500 text-sm line-clamp-6">{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Recipe } from "../types/Recipe";
import { useRecipeStore } from "../store/recipeStore";

export default defineComponent({
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true,
    },
  },
  setup(props) {
    const recipeStore = useRecipeStore();

    const isRecipeFavorite = computed(() =>
      recipeStore.favorites.some((fav) => fav.name === props.recipe.name)
    );

    const toggleFavorite = () => {
      if (isRecipeFavorite.value) {
        recipeStore.removeFromFavorites(props.recipe.name);
      } else {
        recipeStore.addToFavorites({ ...props.recipe, isFavorite: true });
      }
    };

    return {
      isRecipeFavorite,
      toggleFavorite,
    };
  },
});
</script>

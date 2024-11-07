<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <img
      :src="recipe.image[0]"
      :alt="recipe.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">{{ recipe.name }}</h2>
      <p class="text-blue-600 mb-4 font-light">By {{ recipe.author.name }}</p>
      <p class="text-gray-500 text-sm line-clamp-6">{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Recipe } from "../types/Recipe";

export default defineComponent({
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true,
    },
  },
});
</script>

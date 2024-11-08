<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6">
      {{ isEditing ? "Edit Recipe" : "Add New Recipe" }}
    </h2>
    <form @submit.prevent="saveRecipe" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          v-model="form.name"
          id="name"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Image URL</label
        >
        <input
          v-model="form.image"
          id="image"
          type="url"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="author" class="block text-sm font-medium text-gray-700"
          >Author</label
        >
        <input
          v-model="form.author.name"
          id="author"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          for="recipeCuisine"
          class="block text-sm font-medium text-gray-700"
          >Cuisine</label
        >
        <input
          v-model="form.recipeCuisine"
          id="recipeCuisine"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          for="recipeCategory"
          class="block text-sm font-medium text-gray-700"
          >Category</label
        >
        <input
          v-model="form.recipeCategory"
          id="recipeCategory"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="prepTime" class="block text-sm font-medium text-gray-700"
          >Prep Time</label
        >
        <input
          v-model="form.prepTime"
          id="prepTime"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="cookTime" class="block text-sm font-medium text-gray-700"
          >Cook Time</label
        >
        <input
          v-model="form.cookTime"
          id="cookTime"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="totalTime" class="block text-sm font-medium text-gray-700"
          >Total Time</label
        >
        <input
          v-model="form.totalTime"
          id="totalTime"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="form.description"
          id="description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <!-- <div class="flex items-center">
        <input
          v-model="form.isFavorite"
          id="isFavorite"
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label for="isFavorite" class="ml-2 block text-sm text-gray-900"
          >Favorite</label
        >
      </div> -->

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="$router.go(-1)"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ isEditing ? "Update Recipe" : "Add Recipe" }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          @click="deleteRecipe"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipeStore } from "../store/recipeStore";
import { Recipe } from "../types/Recipe";

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();

const isEditing = computed(() => !!route.params.name);
const form = ref<Recipe>({
  name: "",
  url: "",
  image: [],
  author: { name: "" },
  datePublished: "",
  dateModified: "",
  description: "",
  prepTime: "",
  cookTime: "",
  totalTime: "",
  keywords: "",
  recipeCuisine: "",
  recipeCategory: "",
  recipeIngredient: [],
  recipeInstructions: [],
  isFavorite: false,
});

onMounted(() => {
  if (isEditing.value) {
    const recipe = recipeStore.recipes.find(
      (r) => r.name === route.params.name
    );
    if (recipe) {
      form.value = { ...recipe };
    }
  }

  recipeStore.loadRecipesFromLocalStorage();
});

const saveRecipe = () => {
  if (isEditing.value) {
    recipeStore.updateRecipe(form.value);
  } else {
    recipeStore.addRecipe(form.value);
  }
  router.push("/");
};

const deleteRecipe = () => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipeStore.deleteRecipe(form.value.name);
    router.push("/");
  }
};
</script>

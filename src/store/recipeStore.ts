import { defineStore } from "pinia";
import axios from "axios";
import { Recipe } from "../types/Recipe";
import { RecipeState } from "../types/RecipeState";

export const useRecipeStore = defineStore("recipe", {
  state: (): RecipeState => ({
    recipes: [],
    favorites: [],
  }),
  actions: {
    async fetchRecipes() {
      const storedRecipes = localStorage.getItem("recipes");
      if (storedRecipes) {
        this.recipes = JSON.parse(storedRecipes);
      } else {
        try {
          const response = await axios.get(
            "https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json"
          );
          this.recipes = response.data;
          this.saveRecipesToLocalStorage();
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    },

    addToFavorites(recipe: Recipe) {
      if (!this.favorites.some((fav) => fav.name === recipe.name)) {
        this.favorites.push(recipe);
        this.saveFavoritesToLocalStorage();
      }
    },

    removeFromFavorites(recipeName: string) {
      this.favorites = this.favorites.filter((fav) => fav.name !== recipeName);
      this.saveFavoritesToLocalStorage();
    },

    saveFavoritesToLocalStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    loadFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    },

    addRecipe(recipe: Recipe) {
      this.recipes.unshift(recipe);
      this.saveRecipesToLocalStorage();
    },

    updateRecipe(updatedRecipe: Recipe) {
      const index = this.recipes.findIndex(
        (r) => r.name === updatedRecipe.name
      );
      if (index !== -1) {
        this.recipes[index] = updatedRecipe;
        this.recipes = [...this.recipes];
        this.saveRecipesToLocalStorage();
      }
    },

    deleteRecipe(recipeName: string) {
      this.recipes = this.recipes.filter((r) => r.name !== recipeName);
      this.removeFromFavorites(recipeName);
      this.saveRecipesToLocalStorage();
    },

    saveRecipesToLocalStorage() {
      localStorage.setItem("recipes", JSON.stringify(this.recipes));
    },

    loadRecipesFromLocalStorage() {
      const storedRecipes = localStorage.getItem("recipes");
      if (storedRecipes) {
        this.recipes = JSON.parse(storedRecipes);
      }
    },

    initializeStore() {
      // this.loadRecipesFromLocalStorage();
      const storedRecipes = localStorage.getItem("recipes");
      if (storedRecipes) {
        this.recipes = JSON.parse(storedRecipes);
      }
      this.loadFavoritesFromLocalStorage();
    },
  },
});

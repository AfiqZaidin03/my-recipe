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
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/micahcochran/jsoncookbook/refs/heads/main/cookbook-100.json"
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error fetching recipes:", error);
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
  },
});
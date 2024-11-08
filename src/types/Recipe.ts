export interface Recipe {
  name: string;
  url: string;
  image: string[];
  author: Author;
  datePublished: string;
  dateModified: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  keywords: string;
  recipeCuisine: string;
  recipeCategory: string;
  recipeIngredient: string[];
  recipeInstructions: RecipeInstruction[];
  isFavorite?: boolean;
}

export interface Author {
  name: string;
}

export interface RecipeInstruction {
  text: string;
}

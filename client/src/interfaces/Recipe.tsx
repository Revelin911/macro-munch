interface RecipeName {
  name: string;
}

interface RecipeCardProps {
  recipe: RecipeName;
}
interface SavedRecipeCardProps {
  name: string;
  id: number;
}

interface Recipe {
  recipe_id?: number;
  strMeal: string;
  strMealThumb?: string | undefined;
  strInstructions?: string | '';
  id?: number;
  name?: string;
  strIngredient1: string;
  strMeasure1: string;
  strIngredient2: string;
  strMeasure2: string;
  strIngredient3: string;
  strMeasure3: string;
  strIngredient4: string;
  strMeasure4: string;
  strIngredient5: string;
  strMeasure5: string;
  strIngredient6: string;
  strMeasure6: string;
  strIngredient7: string;
  strMeasure7: string;
  strIngredient8: string;
  strMeasure8: string;
  strIngredient9: string;
  strMeasure9: string;
  strIngredient10: string;
  strMeasure10: string;
  // Add other properties as needed
}
export default Recipe;
export type { RecipeCardProps, SavedRecipeCardProps };

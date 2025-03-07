// Purpose: This file contains the savedRecipes component which displays the saved recipes of the user.

import { useState, useEffect } from "react";
import Recipe from "../interfaces/Recipe";
import savedRecipeAPI from "../api/savedRecipeAPI";
import RecipeCard from "../api/recipeApi";
import auth from "../utils/auth";
import SearchNutrition from "../api/nutritionApi";
import NutrientFacts from "../interfaces/Nutrition";

const SavedRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [nutritionFacts, setNutritionFacts] = useState<
    NutrientFacts[] | []
  >([]);
  useEffect(() => {
    console.log();
    savedRecipeAPI.retrieveRecipe(auth.getProfile().id).then((data) => {
      console.log(data);
      const ViableRecipes = data.map((recipe: any) => {
        return {
          name: recipe.name,
          id: recipe.recipe_id,
        };
       });
      console.log(ViableRecipes);
      setSavedRecipes(ViableRecipes);
    });
     
    }, []);
  const handleRecipeClick = (recipe: string) => {
    console.log(recipe);
    RecipeCard(recipe).then((data) => {
      const viewRecipe = data.meals[0];
      console.log(viewRecipe);
      setRecipe(viewRecipe);
    })
  }
  const handleRecipeDelete = (id: number, recipe: string) => {
    console.log(id);
    const User = auth.getProfile();
    if (User.id !== null && User.id !== undefined) {
      savedRecipeAPI.deleteRecipe(id, recipe, User.id);
    }
  }
  const GenerateSavedRecipes = () => {
    
    return (<>
      {savedRecipes.map((recipe: any) => {
      return (
        <div className="savedRecipes">
          <a id="recipeName" onClick={() => handleRecipeClick(recipe.name)}>{recipe.name}</a>
          <button id="deleteRecipe" onClick={() => handleRecipeDelete(recipe.id, recipe.name)}> Remove {recipe.name }</button>
        </div>
      );
    })}
    </>)
    
  };
  const handleIngredient = async (ingredient: string) => {
    if (ingredient === "") {
      return;
    }
    try {
      const data: NutrientFacts[] = await SearchNutrition(ingredient);
      const nutritionData = data.slice(0, 14);
      setNutritionFacts(nutritionData);
    } catch (err) {
      console.error("Could not fetch nutrient data", err);
    }
    console.log(ingredient);
  };
  const WriteNutrition = () => {
    if (nutritionFacts === null) {
      return <></>;
    }
    return (
      <div className="nutrientContainer">
        {nutritionFacts.map((nutrient: NutrientFacts, index: number) => (
          <>
            <p id="nutrition" key={index}>
              {nutrient.nutrientName}
            </p>{" "}
            <p id="nutritionAmount">
              {nutrient.value} {nutrient.unit}
            </p>
          </>
        ))}
      </div>
    );
  };
  return (
    <div className="sideBar">
      <h1 id="sideBar">Saved Recipes</h1>
      <ul className="viableRecipes">
        <GenerateSavedRecipes />
      </ul>
      {recipe ? (
        <>
          <h2 className="recipeName">{recipe.strMeal}</h2>
          <div className="cardContainer">
            <img
              id="recipePic"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <div className="listContainer">
              <h3>Ingredients</h3>
              <ul id="ingredientsList">
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient1)}
                >
                  {recipe.strIngredient1}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure1}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient2)}
                >
                  {recipe.strIngredient2}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure2}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient3)}
                >
                  {recipe.strIngredient3}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure3}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient4)}
                >
                  {recipe.strIngredient4}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure4}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient5)}
                >
                  {recipe.strIngredient5}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure5}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient6)}
                >
                  {recipe.strIngredient6}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure6}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient7)}
                >
                  {recipe.strIngredient7}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure7}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient8)}
                >
                  {recipe.strIngredient8}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure8}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient9)}
                >
                  {recipe.strIngredient9}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure9}</p>
                <a
                  id="ingredient"
                  onClick={() => handleIngredient(recipe.strIngredient10)}
                >
                  {recipe.strIngredient10}{" "}
                </a>
                <p id="measurements">{recipe.strMeasure10}</p>
              </ul>
            </div>
            <WriteNutrition />
          </div>
          <div className="instructionSection">
            <p id="instructions">{recipe?.strInstructions}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SavedRecipe;

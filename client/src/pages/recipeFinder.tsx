import React from "react";
import RecipeCard from "../api/recipeApi";
import Recipe from "../interfaces/Recipe";
import savedRecipeAPI from "../api/savedRecipeAPI";
import auth from "../utils/auth";
import SearchNutrition from "../api/nutritionApi";
import NutrientFacts from "../interfaces/Nutrition";

const RecipeFinder = () => {
  const [meal, setMeal] = React.useState<string>("");
  const [recipe, setRecipe] = React.useState<Recipe>();
  const [nutritionFacts, setNutritionFacts] = React.useState<
    NutrientFacts[] | []
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeal(e.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    RecipeCard(meal).then((data) => {
      if (data.meals === null) {
        setRecipe({
          strMeal: "No meal found",
          strMealThumb: "",
          strInstructions: "",
          strIngredient1: "",
          strMeasure1: "",
          strIngredient2: "",
          strMeasure2: "",
          strIngredient3: "",
          strMeasure3: "",
          strIngredient4: "",
          strMeasure4: "",
          strIngredient5: "",
          strMeasure5: "",
          strIngredient6: "",
          strMeasure6: "",
          strIngredient7: "",
          strMeasure7: "",
          strIngredient8: "",
          strMeasure8: "",
          strIngredient9: "",
          strMeasure9: "",
          strIngredient10: "",
          strMeasure10: "",
        });
      } else {
        setRecipe(data.meals[0]);
      }
    });
  };
  const handleIngredient = async (ingredient: string) => {
    if (ingredient === "") {
      return;
    }
    try {
      const data: NutrientFacts[] = await SearchNutrition(ingredient);
      const nutritionData = data.slice(0, 15);
      setNutritionFacts(nutritionData);
    } catch (err) {
      console.error("Could not fetch nutrient data", err);
    }
    console.log(ingredient);
  };
  const handleRecipeSave = () => {
    if (recipe !== undefined) {
      const User = auth.getProfile();
      if (User.id !== null && User.id !== undefined) {
        console.log(recipe);
        const newRecipe = recipe.strMeal;
        console.log(newRecipe);
        savedRecipeAPI
          .saveRecipe(User.id, newRecipe)
          .then((data) => {
            console.log("Recipe saved:", data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log(User);
      }
    }
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
        {nutrient.nutrientName}</p> <p id="nutritionAmount">{nutrient.value} {nutrient.unit}
            </p>
          </>
    ))}
</div >
  );
  };
  return (
    <div>
      <div className="headContainer">
        <h1> Recipe Finder</h1>
        <form onSubmit={handleFormSubmit}>
          <button id="recipeForm" type="submit">
            Search
          </button>
          <input
            id="recipeInput"
            type="text"
            placeholder="Search for a recipe"
            onChange={handleInputChange}
          />
        </form>
      </div>
      {recipe ? (
        <div>
          <div className="buttonContainer">
            <button
              id="saveMeal"
              onClick={() => handleRecipeSave()}>
              <p id="saveMeal">save Meal</p>
            </button>
          </div>
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
          <div></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default RecipeFinder;

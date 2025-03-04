import { RecipeCardProps } from "../interfaces/Recipe";
import auth from '../utils/auth';




const retrieveRecipe = async (loggedInUser: number | null): Promise<RecipeCardProps[] | []> => {
    try {
      const response = await fetch(`/api/recipes/user/${loggedInUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        }
      });
      const data = await response.json();
      if(!response.ok) {
        throw new Error('Invalid recipe API response!')
      }
      return data;
    } catch (err) {
      console.log('error from data retrieval', err);
      return Promise.reject('Could not fetch recipe');
    }
}
  
const saveRecipe = async (
  loggedInUser: number,
  recipeName: string
): Promise<RecipeCardProps | string> => {
  console.log("saveRecipe", loggedInUser, recipeName);
  try {
    const response = await fetch(`/api/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      body: JSON.stringify({
        name: recipeName,
        UserId: loggedInUser,
        ingredients: [],
        description: "",
      }),
      
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Response not OK:", data); // Log the response data
      throw new Error("Invalid recipe API response!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval", err);
    return Promise.reject("Could not save recipe");
  }
};
const deleteRecipe = async (
  recipeId: number,
  recipeName: string,
  loggedInUser: number
): Promise<string> => {
  console.log("deleteRecipe", loggedInUser, recipeName, recipeId);
  try {
    const response = await fetch(`api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); // Log the response text for debugging
      console.error("Response not OK:", errorData);
      if (response.status === 404) {
        throw new Error(`Recipe with ID ${recipeId} not found.`);
      }
      throw new Error("Invalid recipe API response!");
    }

    return "Recipe deleted successfully!";
  } catch (err) {
    console.log("Error from data retrieval", err);
    return Promise.reject("Could not delete recipe");
  }
};

export default { retrieveRecipe, saveRecipe, deleteRecipe };
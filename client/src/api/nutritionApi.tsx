import NutrientFacts from '../interfaces/Nutrition';
import auth from '../utils/auth';


const SearchNutrition = async (food: NutrientFacts | string) =>{ 
      try {
        const response = await fetch(
          `/api/nutrition/${food}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${auth.getToken()}`,
                    }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: NutrientFacts[] = await response.json();
        return data;
  
      } catch (err) {
        console.log("Unable to retrieve data", err);
        return Promise.reject("Could not fetch nutritional facts");
      }
    };
   
export default SearchNutrition;
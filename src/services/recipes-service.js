export default class RecipeService {
  static async getRecipe(ingredient, health, cuisineType, mealType) {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&diet=${diet}&health=${health}&cuisineType=${cuisineType}&mealType=${mealType}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
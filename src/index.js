import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeService from './services/recipes-service';

let ingredient = "chicken";
let health = "gluten-free";
let cuisineType = "American";
let mealType = "Breakfast"

async function makeApiCall() {
  const response = await RecipeService.getRecipe(ingredient, health, cuisineType, mealType);
  getElements(response);
}

function getElements(response) {
  if (response.hits) {
    for (let i = 0; i < response.hits.length; i++) {
      $('.showRecipes').append(`
      <div class="card" style="width: 20rem;">
        <img src="${response.hits[i].recipe.images.REGULAR.url}" class="card-img-top" alt="a photo of meal">
        <div class="card-body">
          <h5 class="card-title">${response.hits[i].recipe.label}</h5>
          <p class="card-text">Total time: ${response.hits[i].recipe.totalTime} mins</p>
          <p class="card-text">Total calories: ${(parseFloat(response.hits[i].recipe.calories).toFixed(2))}</p>
          <div id="showIngredient${i}"> 
          </div>  
          <a href="${response.hits[i].recipe.url}" class="btn btn-primary center">See full recipe</a>
        </div>
      </div>
      `);
      let ingredientArr =  response.hits[i].recipe.ingredientLines;
      let ingredientStr = `<ul><li> ${ingredientArr.join("</li><li>")} </li></ul>`;
      $(`#showIngredient${i}`).append(`${ingredientStr}`);
    }
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

$(document).ready(function(){
  makeApiCall();
});

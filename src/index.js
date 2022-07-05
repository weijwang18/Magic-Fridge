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
      <div class="card" style="width: 18rem;">
        <img src="${response.hits[i].recipe.images.REGULAR.url}" class="card-img-top" alt="a photo of meal">
        <div class="card-body">
          <h5 class="card-title">${response.hits[i].recipe.label}</h5>
          <div id="showIngredient${i}"> 
          </div>  
          <p class="card-text">Total time: ${response.hits[i].recipe.totalTime} mins</p>
          <a href="${response.hits[i].recipe.url}" class="btn btn-primary">See more details</a>
        </div>
      </div>
      `);
      let ingredientArr =  response.hits[i].recipe.ingredientLines;
      let ingredientStr = `<li> ${ingredientArr.join("</li><li>")} </li>`;
      $(`#showIngredient${i}`).append(`${ingredientStr}`);
    }
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

$(document).ready(function(){
  makeApiCall();
});

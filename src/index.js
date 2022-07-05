import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeService from './services/recipes-service';

let ingredient = "chicken";
let diet = "balanced";
let health = "gluten-free";
let time = "15-30";

async function makeApiCall() {
  const response = await RecipeService.getRecipe(ingredient, diet, health, time);
  getElements(response);
}

function getElements(response) {
  if (response.hits) {
    for (let j = 0; j < response.hits[0].recipe.ingredientLines.length; j++) {
      let ingredient =  `<li> ${response.hits[0].recipe.ingredientLines[j]} </li>`
      $('.showIngredient').append(`${ingredient}
     
      `);
    }
    for (let i = 0; i < response.hits.length; i++) {
      $('.showRecipes').append(`
      <div class="card" style="width: 18rem;">
        <img src="${response.hits[i].recipe.images.REGULAR.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${response.hits[i].recipe.label}</h5>
          <ul></ul>
          <p class="card-text">Total time: ${response.hits[i].recipe.totalTime} mins</p>
          <a href="${response.hits[i].recipe.url}" class="btn btn-primary">See more details</a>
        </div>
      </div>
      `);
    }
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

$(document).ready(function(){
  makeApiCall();
});

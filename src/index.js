import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeService from './services/recipes-service';

let ingredient = "chicken";
let health = "gluten-free";
let cuisineType = "American";
let mealType = "Breakfast";

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
          <p class="card-text">Total Fat: ${(parseInt(response.hits[i].recipe.totalNutrients.FAT.quantity))}${response.hits[i].recipe.totalNutrients.FAT.unit}</p>
          <p class="card-text">Total Carbs: ${(parseInt(response.hits[i].recipe.totalNutrients.CHOCDF.quantity))}${response.hits[i].recipe.totalNutrients.CHOCDF.unit}</p>
          <p class="card-text">Total Protein: ${(parseInt(response.hits[i].recipe.totalNutrients.PROCNT.quantity))}${response.hits[i].recipe.totalNutrients.PROCNT.unit}</p>
          <div class="ingredientListTitle">
            <p>Ingredient List</p>
            <div id="showIngredient${i}" class="ingredientList"> 
            </div>
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

// $(".random").click(function() {
//   let must_check = 4;
//   let checkboxes = Object.keys($('.vegetables input:checkbox[name=vegetables]')).length;
//   console.log($('.vegetables input:checkbox[name=vegetables]'))
//   console.log(Object.keys($('.vegetables input:checkbox[name=vegetables]'))[0])
//   while (Object.keys($('.vegetables input:checkbox[name=vegetables]:checked')).length < must_check) {
//     console.log(Object.keys($('.vegetables input:checkbox[name=vegetables]:checked')).length)
//     let random_checkbox = Math.floor(Math.random() * checkboxes) + 1;
//     console.log(random_checkbox)
//     $(".vegetables input:nth-child("+random_checkbox+")").prop("checked", true);
//   }
// });

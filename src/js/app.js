//import * as flsFunctions from "./modules/functions.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import favouritesView from "./views/favouritesView.js";
//import addView from "./views/addView.js";

//flsFunctions.isWebp();
const recipeContainer = document.querySelector(".recipe");
//
const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    //TEST
    resultsView.update(model.getSearchResultsPage());

    //1.Loading cocktail from API
    const id = window.location.hash.slice(1);
    await model.loadCocktail(id);
    const { cocktail } = model.state;
    //2.Rendering cocktail to div.recipe
    recipeView.render(cocktail);
    favouritesView.update(model.state.favourites);
  } catch (error) {
    recipeView.renderError();
  }
};
const controlResults = async function () {
  try {
    resultsView.renderSpinner();
    //get input query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //render search results to sidebar (one page with the first one as default)
    resultsView.render(model.getSearchResultsPage());
    //render actual pagination
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};
const controlPagination = function (page) {
  //model.state.search.currentPage = page;
  resultsView.render(model.getSearchResultsPage(page));
  //render new pagination
  paginationView.render(model.state.search);
};
const controlAddToFavourites = function () {
  if (!model.state.cocktail.bookmarked) {
    model.addToFavourites(model.state.cocktail);
  } else {
    model.removeFromFavourites(model.state.cocktail.id);
  }
  recipeView.update(model.state.cocktail);
  favouritesView.render(model.state.favourites);
};
const controlFavourites = function () {
  favouritesView.render(model.state.favourites);
};
// const controlAddCocktail = function (newCocktail) {
//   //console.log(newCocktail);
//   model.uploadCocktail(newCocktail);
// };
const init = function () {
  favouritesView.addHandlerRender(controlFavourites);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  recipeView.addHandlerAddToFavourites(controlAddToFavourites);
  searchView.addHandlerSearch(controlResults);
  paginationView.addHandlerClick(controlPagination);
  //addView.addHandlerUpload(controlAddCocktail);
};
init();

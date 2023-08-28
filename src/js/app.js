//import * as flsFunctions from "./modules/functions.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

//flsFunctions.isWebp();
const recipeContainer = document.querySelector(".recipe");
//
const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    //1.Loading cocktail from API
    const id = window.location.hash.slice(1);
    await model.loadCocktail(id);
    const { cocktail } = model.state;
    //2.Rendering cocktail to div.recipe
    recipeView.render(cocktail);
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
    resultsView.render(model.getSearchResultsPage(1));
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
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  searchView.addHandlerSearch(controlResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

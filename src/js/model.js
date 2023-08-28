import { API_URL, PREVIEWS_PER_PAGE } from "./configuration.js";
import { getJSON } from "./helpers.js";
export const state = {
  cocktail: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    resultsPerPage: PREVIEWS_PER_PAGE,
  },
};
export const loadCocktail = async function (id) {
  try {
    const data = await getJSON(`${API_URL}lookup.php?i=${id}`);
    const cocktail = data.drinks[0];
    //Putting ingredients and measurments into array of arrays of objects for convinience
    function getIngredientsArray(cocktail) {
      const ingredientsArray = [];
      let maxIngredients = 15; //max quantity of ingredients in API
      for (let i = 1; i <= maxIngredients; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measurement = cocktail[`strMeasure${i}`];
        if (ingredient && measurement) {
          ingredientsArray.push({
            ingredientName: ingredient,
            ingredientMeasure: measurement,
            ingredientThumbLink: `https://www.thecocktaildb.com/images/ingredients/${ingredient.toLowerCase()}-Small.png`,
          });
        }
      }
      return ingredientsArray;
    }
    const ingredientsArray = getIngredientsArray(cocktail);
    state.cocktail = {
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      alcoholic: cocktail.strAlcoholic,
      glass: cocktail.strGlass,
      instructions: cocktail.strInstructions,
      imageURL: cocktail.strDrinkThumb,
      ingredientsArray: ingredientsArray,
    };
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}search.php?s=${query}`);
    const matchingResults = data.drinks;
    state.search.results = matchingResults.map((cocktail) => {
      return {
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        category: cocktail.strCategory,
        imageURL: cocktail.strDrinkThumb,
        favourite: false,
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getSearchResultsPage = function (
  pageNumber = state.search.currentPage
) {
  state.search.currentPage = pageNumber;
  const start = (pageNumber - 1) * PREVIEWS_PER_PAGE;
  const end = start + PREVIEWS_PER_PAGE;
  const searchResultsPage = state.search.results.slice(start, end);
  return searchResultsPage;
};

import {
  API_URL,
  PREVIEWS_PER_PAGE,
  MAX_INGREDIENTS,
} from "./configuration.js";
import { getJSON, sendJSON } from "./helpers.js";
export const state = {
  cocktail: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    resultsPerPage: PREVIEWS_PER_PAGE,
  },
  favourites: [],
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
      category: cocktail.strCategory,
    };
    if (state.favourites.some((object) => object.id === id)) {
      state.cocktail.bookmarked = true;
      console.log(state.cocktail.bookmarked);
    } else {
      state.cocktail.bookmarked = false;
    }
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
    //To have new results started from page 1:
    state.search.currentPage = 1;
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
const persistFavourites = function () {
  localStorage.setItem("favourites", JSON.stringify(state.favourites));
};
export const addToFavourites = function (cocktail) {
  state.favourites.push(cocktail);
  if (cocktail.id === state.cocktail.id) state.cocktail.bookmarked = true;
  persistFavourites();
};
export const removeFromFavourites = function (id) {
  const index = state.favourites.findIndex((object) => object.id === id);
  state.favourites.splice(index, 1);
  if (id === state.cocktail.id) state.cocktail.bookmarked = false;
  persistFavourites();
};
const init = function () {
  const storage = localStorage.getItem("favourites");
  if (storage) state.favourites = JSON.parse(storage);
};

init();

export const uploadCocktail = async function (newCocktail) {
  try {
    const timestamp = new Date().getTime();
    console.log(newCocktail);
    const coctailToAdd = {
      idDrink: timestamp,
      strDrink: newCocktail["cocktail-name"],
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: newCocktail["drink-type"],
      strIBA: null,
      strAlcoholic: newCocktail["alcohol"],
      strGlass: newCocktail["glass-type"],
      strInstructions: newCocktail["message"],
      strInstructionsES: null,
      strInstructionsDE: null,
      strInstructionsFR: null,
      strInstructionsIT: null,
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      strDrinkThumb: newCocktail["image-url"],
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };
    for (let i = 1; i <= MAX_INGREDIENTS; i++) {
      const ingredientKey = `ingredient-${i}`;
      const quantityKey = `quantity-${i}`;

      coctailToAdd[ingredientKey] = newCocktail[ingredientKey] || null;
      coctailToAdd[quantityKey] = newCocktail[quantityKey] || null;
    }
    const data = await sendJSON(`${API_URL}`);
    console.log(data);
  } catch (error) {
    throw error;
  }
};

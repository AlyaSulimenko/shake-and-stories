import View from "./View.js";
class RecipeView extends View {
  parentElement = document.querySelector(".recipe");
  errorMessage = `Sorry, wrong request🥺`;
  message = `Start by searching for a cocktail🍹🍸🍋`;
  addHandlerRender(handler) {
    window.addEventListener("hashchange", handler);
    //the same on load?
  }
  generateIngredientMarkup(ingredients) {
    return ingredients.reduce((acc, ingredient) => {
      return (
        acc +
        `<li class="recipe__ingredient ingredient">
		  <figure class="ingredient__image">
			 <img src="${ingredient.ingredientThumbLink}" alt="${ingredient.ingredientName}" />
		  </figure>
		  <span class="ingredient__name">${ingredient.ingredientName}</span>
		  <span class="ingredient__measurement">${ingredient.ingredientMeasure}</span>
		</li>`
      );
    }, "");
  }
  generateMarkup() {
    const ingredientMarkup = this.generateIngredientMarkup(
      this.data.ingredientsArray
    );
    return `<figure class="recipe__figure">
	 <img
	 src="${this.data.imageURL}"
		alt="${this.data.name}"
		class="recipe__image"
		crossorigin
	 />
	 <div class="recipe__header">
		<h1 class="recipe__title title title-1">
		  <span>${this.data.name}</span>
		</h1>
		<div class="recipe__user-generated">
		  <svg>
			 <use href="./img/icons.svg#icon-star-empty"></use>
		  </svg>
		</div>
	 </div>
	 <div class="recipe__details details">
		<div class="details__item">
		  <p class="details__description">${
        this.data.alcoholic === "Alcoholic"
          ? "😈"
          : this.data.alcoholic === "Non alcoholic"
          ? "👼🏼"
          : "🤔"
      }${this.data.alcoholic}</p>
		</div>
		<div class="details__item">
		  <p class="details__description">🍹${this.data.glass}</p>
		</div>
	 </div>
  </figure>
  <div class="recipe__body">
	 <ul class="recipe__part recipe__ingredients">
	 ${ingredientMarkup}
	 </ul>
	 <div class="recipe__part recipe__instructions">
	 ${this.data.instructions}
	 </div>
  </div>`;
  }
}
export default new RecipeView();

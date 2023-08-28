// ... Your existing code ...

function getIngredientsMarkup(ingredientsArray) {
  return ingredientsArray.reduce((acc, ingredient) => {
    return (
      acc +
      `<li class="recipe__ingredient ingredient">
			 <figure class="ingredient__image">
				<img src="${ingredient.strThumbLink}" alt="${ingredient.strIngredient}" />
			 </figure>
			 <span class="ingredient__name">${ingredient.strIngredient}</span>
			 <span class="ingredient__measurement">${ingredient.strMeasure}</span>
		  </li>`
    );
  }, "");
}

const ingredientsMarkup = getIngredientsMarkup(ingredientsArray);

const recipeMarkup = `<figure class="recipe__figure">
	  <!-- ... Other parts of the figure ... -->
	</figure>
	<div class="recipe__body">
	  <ul class="recipe__part recipe__ingredients">
		 ${ingredientsMarkup}
	  </ul>
	  <div class="recipe__part recipe__instructions">
		 ${cocktail.strInstructions}
	  </div>
	</div>`;

// ... Your existing code ...

recipeContainer.innerHTML = "";
recipeContainer.insertAdjacentHTML("afterbegin", recipeMarkup);

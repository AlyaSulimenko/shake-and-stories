import View from "./View.js";
class ResultsView extends View {
  parentElement = document.querySelector(".sidebar__list");
  errorMessage = `Sorry, we couldn't find this drink in our collection🥺`;
  message = `Start by searching for a cocktail or an ingredient🍹🍸🍋`;
  generateMarkup() {
    const results = this.data;
    const resultsMarkup = results.map((result) => {
      return `<li class="sidebar__item preview">
	<a class="preview__link" href="#${result.id}">
	  <figure class="preview__image">
		 <img src=${result.imageURL} alt="${result.name}" crossorigin />
	  </figure>
	  <div class="preview__data">
		 <h4 class="preview__title">${result.name}</h4>
		 <p class="preview__additional">${result.category}</p>
	  </div>
	  <div class="preview__user-generated">
		 <svg>
			<use href="../../img/icons.svg${
        result.favourite ? "#icon-star-full" : "#icon-star-empty"
      }"></use>
		 </svg>
	  </div>
	</a>
 </li>`;
    });
    return resultsMarkup;
  }
}
export default new ResultsView();

import View from "./View.js";
import previewView from "./previewView.js";
class FavouritesView extends View {
  parentElement = document.querySelector(".favourites__list");
  errorMessage = `Add your favourites🍹🍸`;
  message = ``;
  generateMarkup() {
    const results = Array.from(this.data);
    const resultsMarkup = results
      .map((result) => previewView.render(result, false))
      .join("");
    return resultsMarkup;
  }
  addHandlerRender(handler) {
    window.addEventListener("load", handler());
  }
  //   generateMarkup() {
  //     const results = this.data;
  //     const id = window.location.hash.slice(1);
  //     const resultsMarkup = results.map((result) => {
  //       return `<li class="sidebar__item preview">
  // 	<a class="preview__link ${result.id === id ? "preview__link--active" : ""}
  // 	" href="#${result.id}">
  // 	  <figure class="preview__image">
  // 		 <img src=${result.imageURL} alt="${result.name}" crossorigin />
  // 	  </figure>
  // 	  <div class="preview__data">
  // 		 <h4 class="preview__title">${result.name}</h4>
  // 		 <p class="preview__additional">${result.category}</p>
  // 	  </div>
  // 	</a>
  //  </li>`;
  //     });
  //     return resultsMarkup;
  //   }
}
export default new FavouritesView();

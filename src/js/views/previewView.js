import View from "./View.js";
class PreviewView extends View {
  parentElement = "";
  //   generateMarkup() {
  //     const results = this.data;

  //     const resultsMarkup = results.map((result) => {
  //       return this.generateMarkupPreview.join("");
  //     });
  //     return resultsMarkup;
  //   }
  generateMarkup() {
    const id = window.location.hash.slice(1);
    const result = this.data;
    return `<li class="sidebar__item preview">
	<a class="preview__link ${result.id === id ? "preview__link--active" : ""}
	" href="#${result.id}">
	  <figure class="preview__image">
		 <img src=${result.imageURL} alt="${result.name}" crossorigin />
	  </figure>
	  <div class="preview__data">
		 <h4 class="preview__title">${result.name}</h4>
		 <p class="preview__additional">${result.category}</p>
	  </div>
	</a>
 </li>`;
  }
}
export default new PreviewView();

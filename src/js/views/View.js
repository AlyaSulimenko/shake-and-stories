//Parent class for all the other views
export default class View {
  data;
  render(data, render = true) {
    if (!data || (data.isArray && data.length !== 0)) return this.renderError();
    this.data = data;
    const recipeMarkup = this.generateMarkup();
    if (!render) return recipeMarkup;
    this.clear();
    this.paste(recipeMarkup);
    //  Which stands for:
    //  this.parentElement.innerHTML = "";
    //  this.parentElement.insertAdjacentHTML("afterbegin", recipeMarkup);
  }
  update(data) {
    //if (!data || (data.isArray && data.length !== 0)) return this.renderError();
    this.data = data;
    const newRecipeMarkup = this.generateMarkup();
    //compare new markup to an old one:
    const newDOM = document
      .createRange()
      .createContextualFragment(newRecipeMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this.parentElement.querySelectorAll("*")
    );
    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];
      //update text content if changed
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ""
      ) {
        currentElement.textContent = newElement.textContent;
      }
      //update data attributes if changed
      if (!newElement.isEqualNode(currentElement))
        Array.from(newElement.attributes).forEach((attribute) =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
    });
  }
  clear() {
    this.parentElement.innerHTML = "";
  }
  paste(markup) {
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const spinnerMarkup = `<div class="spinner">
	 <svg>
		<use href="../../img/icons.svg#icon-spinner"></use>
	 </svg>
  </div>`;
    this.clear();
    this.paste(spinnerMarkup);
  }
  renderError(message = this.errorMessage) {
    const errorMarkup = `<div class="error">
	 <div>
		<svg>
		  <use href="../../img/icons.svg#icon-bulb"></use>
		</svg>
	 </div>
	 <p>${message}</p>
  </div>`;
    this.clear();
    this.paste(errorMarkup);
  }
  renderMessage(message = this.message) {
    const messageMarkup = `<div class="message">
	<div>
	  <svg>
		 <use href="../../img/icons.svg#icon-bulb"></use>
	  </svg>
	</div>
	<p>${message}</p>
 </div>`;
    this.clear();
    this.paste(messageMarkup);
  }
}

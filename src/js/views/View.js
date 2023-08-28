//Parent class for all the other views
export default class View {
  data;
  render(data) {
    this.data = data;
    if (!data || (data.isArray && data.length !== 0)) return this.renderError();
    const recipeMarkup = this.generateMarkup();
    this.clear();
    this.paste(recipeMarkup);
    //  Which stands for:
    //  this.parentElement.innerHTML = "";
    //  this.parentElement.insertAdjacentHTML("afterbegin", recipeMarkup);
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

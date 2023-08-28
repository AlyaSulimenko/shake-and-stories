export class SearchView {
  parentElement = document.querySelector(".search");
  clear() {
    this.parentElement.querySelector(".search__input").value = "";
  }
  getQuery() {
    const query = this.parentElement.querySelector(".search__input").value;
    return query;
  }
  addHandlerSearch(handler) {
    this.parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this.clear();
    });
  }
}
export default new SearchView();

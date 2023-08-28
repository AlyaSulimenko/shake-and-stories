import View from "./View.js";
class PaginationView extends View {
  parentElement = document.querySelector(".pagination__body");
  generateNumbers() {
    const resultsObject = this.data;
    const numPages = this.calculateNumPages(resultsObject);
    let paginationLinks = "";
    for (let i = 1; i <= numPages; i++) {
      paginationLinks += this.generatePaginationNumber(
        i,
        resultsObject.currentPage
      );
    }
    return paginationLinks;
  }
  generateMarkup() {
    const resultsObject = this.data;
    const numPages = this.calculateNumPages(resultsObject);
    return `
      ${this.generatePrevButton(resultsObject.currentPage)}
      <div class="pagination__numbers" id="pagination-numbers">
        ${this.generateNumbers()}
      </div>
      ${this.generateNextButton(resultsObject.currentPage, numPages)}
    `;
  }
  calculateNumPages(resultsObject) {
    const numResults = resultsObject.results.length;
    const resultsPerPage = resultsObject.resultsPerPage;
    return Math.ceil(numResults / resultsPerPage);
  }
  generatePaginationNumber(pageNumber, currentPage) {
    return `
      <a href="#" class="pagination__number ${
        currentPage === pageNumber ? "active" : ""
      }">
        ${pageNumber}
      </a>
    `;
  }
  generatePrevButton(currentPage) {
    return `
      <a href="#" class="pagination__arrow pagination__arrow_prev ${
        currentPage === 1 ? "disabled" : ""
      }" id="prev-button">
        <svg><use href="./img/icons.svg#icon-circle-left"></use></svg>
      </a>
    `;
  }
  generateNextButton(currentPage, numPages) {
    return `
      <a href="#" class="pagination__arrow pagination__arrow_next ${
        currentPage === numPages ? "disabled" : ""
      }" id="next-button">
        <svg><use href="./img/icons.svg#icon-circle-right"></use></svg>
      </a>
    `;
  }
}

export default new PaginationView();

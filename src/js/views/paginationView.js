import View from "./View.js";
class PaginationView extends View {
  parentElement = document.querySelector(".pagination__body");
  constructor() {
    super();
    this.currentPage = 1; // Initialize current page
    this.numbersShown = 5; // Number of pagination numbers to show
  }
  generateNumbers() {
    const resultsObject = this.data;
    const numPages = this.calculateNumPages(resultsObject);
    //to be sure first number is never less than 1
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.numbersShown / 2)
    );
    //& last number is never more than numPages
    const endPage = Math.min(numPages, startPage + this.numbersShown - 1);

    let paginationLinks = "";
    for (let i = startPage; i <= endPage; i++) {
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
    if (numPages === 1) {
      return ``;
    } else {
      return `
      ${this.generatePrevButton(resultsObject.currentPage)}
      <div class="pagination__numbers" id="pagination-numbers">
        ${this.generateNumbers()}
      </div>
      ${this.generateNextButton(resultsObject.currentPage, numPages)}
    `;
    }
  }
  calculateNumPages(resultsObject) {
    const numResults = resultsObject.results.length;
    const resultsPerPage = resultsObject.resultsPerPage;
    return Math.ceil(numResults / resultsPerPage);
  }
  generatePaginationNumber(pageNumber, currentPage) {
    return `
      <a href="#" data-page="${pageNumber}" class="pagination__button pagination__number ${
      currentPage === pageNumber ? "active" : ""
    }">
        ${pageNumber}
      </a>
    `;
  }
  generatePrevButton(currentPage) {
    return `
      <a href="#" data-page="${
        currentPage - 1
      }" class="pagination__button pagination__arrow pagination__arrow_prev ${
      currentPage === 1 ? "disabled" : ""
    }" id="prev-button">
        <svg><use href="./img/icons.svg#icon-circle-left"></use></svg>
      </a>
    `;
  }
  generateNextButton(currentPage, numPages) {
    return `
      <a href="#" data-page="${
        currentPage + 1
      }" class="pagination__button pagination__arrow pagination__arrow_next ${
      currentPage === numPages ? "disabled" : ""
    }" id="next-button">
        <svg><use href="./img/icons.svg#icon-circle-right"></use></svg>
      </a>
    `;
  }
  addHandlerClick(handler) {
    this.parentElement.addEventListener("click", (event) => {
      const buttonClicked = event.target.closest(".pagination__button");
      if (!buttonClicked) return;

      const dataPage = +buttonClicked.dataset.page;

      if (buttonClicked.classList.contains("pagination__number")) {
        // Handle pagination number click
        this.currentPage = dataPage; // Update current page
      } else if (buttonClicked.id === "prev-button") {
        // Handle previous button click
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      } else if (buttonClicked.id === "next-button") {
        // Handle next button click
        const numPages = this.calculateNumPages(this.data);
        if (this.currentPage < numPages) {
          this.currentPage++;
        }
      }

      handler(this.currentPage);
    });
  }
}

export default new PaginationView();

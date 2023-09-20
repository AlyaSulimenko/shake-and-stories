import View from "./View.js";

class PaginationView extends View {
  // ... Existing properties and methods ...

  // Add a constructor to initialize some properties
  constructor() {
    super();
    this.currentPage = 1; // Initialize current page
    this.numbersShown = 5; // Number of pagination numbers to show
  }

  // Update the generateNumbers() method to consider numbersShown
  generateNumbers() {
    const resultsObject = this.data;
    const numPages = this.calculateNumPages(resultsObject);

    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.numbersShown / 2)
    );
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

  // Modify addHandlerClick() to handle arrow clicks
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

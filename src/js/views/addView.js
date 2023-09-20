import View from "./View.js";

class addView extends View {
  parentElement = document.querySelector(".add__form");
  addWindow = document.getElementById("add-cocktail");
  addOpenButton = document.getElementById("add-button");
  addCloseArrow = document.querySelector(".add__close");
  ingredientsElement = document.querySelector(".form__ingredients");
  ingredientsCount = document.getElementById("ingredients-count");
  uploadButton = document.getElementById("upload-button");
  constructor() {
    super();
    this.addHandlerOpenAddWindow();
    this.addHandlerHideAddWindow();
    this.addHandlerSetIngredients();
    // this.addHandlerUpload();
  }
  generateIngredientsMarkup(i) {
    const markup = `<div class="form__ingredient-group">
	 <label for="ingredient-${i}" class="form__label description description-3 ingredient-label-1">Ingredient:</label>
	 <select id="ingredient-${i}" class="form__input ingredient-input-1" name="ingredient-${i}" required>
		<option value="Añejo rum">Añejo rum</option>
		<option value="Absolut Citron">Absolut Citron</option>
		<option value="Ale">Ale</option>
		<option value="Amaretto">Amaretto</option>
		<option value="Angelica root">Angelica root</option>
		<option value="Apple brandy">Apple brandy</option>
		<option value="Apple cider">Apple cider</option>
		<option value="Applejack">Applejack</option>
		<option value="Apricot brandy">Apricot brandy</option>
		<option value="Berries">Berries</option>
		<option value="Bitters">Bitters</option>
		<option value="Blackberry brandy">Blackberry brandy</option>
		<option value="Blended whiskey">Blended whiskey</option>
		<option value="Bourbon">Bourbon</option>
		<option value="Brandy">Brandy</option>
		<option value="Brown sugar">Brown sugar</option>
		<option value="Cantaloupe">Cantaloupe</option>
		<option value="Carbonated water">Carbonated water</option>
		<option value="Champagne">Champagne</option>
		<option value="Cherry brandy">Cherry brandy</option>
		<option value="Chocolate">Chocolate</option>
		<option value="Chocolate liqueur">Chocolate liqueur</option>
		<option value="Chocolate syrup">Chocolate syrup</option>
		<option value="Cider">Cider</option>
		<option value="Cocoa powder">Cocoa powder</option>
		<option value="Coffee">Coffee</option>
		<option value="Coffee brandy">Coffee brandy</option>
		<option value="Coffee liqueur">Coffee liqueur</option>
		<option value="Cognac">Cognac</option>
		<option value="Cranberries">Cranberries</option>
		<option value="Cranberry juice">Cranberry juice</option>
		<option value="Cream">Cream</option>
		<option value="Creme de Cacao">Creme de Cacao</option>
		<option value="Creme de Cassis">Creme de Cassis</option>
		<option value="Creme de Menthe">Creme de Menthe</option>
		<option value="Demerara Sugar">Demerara Sugar</option>
		<option value="Dubonnet Rouge">Dubonnet Rouge</option>
		<option value="Egg">Egg</option>
		<option value="Egg yolk">Egg yolk</option>
		<option value="Espresso">Espresso</option>
		<option value="Everclear">Everclear</option>
		<option value="Firewater">Firewater</option>
		<option value="Galliano">Galliano</option>
		<option value="Gin">Gin</option>
		<option value="Ginger">Ginger</option>
		<option value="Grapes">Grapes</option>
		<option value="Grapefruit juice">Grapefruit juice</option>
		<option value="Grape juice">Grape juice</option>
		<option value="Green Creme de Menthe">
		  Green Creme de Menthe
		</option>
		<option value="Grenadine">Grenadine</option>
		<option value="Heavy cream">Heavy cream</option>
		<option value="Irish cream">Irish cream</option>
		<option value="Irish whiskey">Irish whiskey</option>
		<option value="Jack Daniels">Jack Daniels</option>
		<option value="Johnnie Walker">Johnnie Walker</option>
		<option value="Kiwi">Kiwi</option>
		<option value="Lager">Lager</option>
		<option value="Lemon">Lemon</option>
		<option value="Lemonade">Lemonade</option>
		<option value="Lemon juice">Lemon juice</option>
		<option value="Lemon vodka">Lemon vodka</option>
		<option value="Lime">Lime</option>
		<option value="Lime juice">Lime juice</option>
		<option value="Malibu rum">Malibu rum</option>
		<option value="Mango">Mango</option>
		<option value="Maraschino cherry">Maraschino cherry</option>
		<option value="Martini Rosso">Martini Rosso</option>
		<option value="Mezcal">Mezcal</option>
		<option value="Midori melon liqueur">Midori melon liqueur</option>
		<option value="Milk">Milk</option>
		<option value="Mint">Mint</option>
		<option value="Orange">Orange</option>
		<option value="Orange bitters">Orange bitters</option>
		<option value="Orange juice">Orange juice</option>
		<option value="Peach nectar">Peach nectar</option>
		<option value="Peach Vodka">Peach Vodka</option>
		<option value="Peanut Oil">Peanut Oil</option>
		<option value="Peppermint schnapps">Peppermint schnapps</option>
		<option value="Pineapple juice">Pineapple juice</option>
		<option value="Pisco">Pisco</option>
		<option value="Port">Port</option>
		<option value="Red wine">Red wine</option>
		<option value="Ricard">Ricard</option>
		<option value="Rum">Rum</option>
		<option value="Rye whiskey">Rye whiskey</option>
		<option value="Sambuca">Sambuca</option>
		<option value="Scotch">Scotch</option>
		<option value="Sherry">Sherry</option>
		<option value="Sloe gin">Sloe gin</option>
		<option value="Southern Comfort">Southern Comfort</option>
		<option value="Soy milk">Soy milk</option>
		<option value="Spiced rum">Spiced rum</option>
		<option value="Sprite">Sprite</option>
		<option value="Squirt">Squirt</option>
		<option value="Strawberries">Strawberries</option>
		<option value="Strawberry schnapps">Strawberry schnapps</option>
		<option value="Sugar">Sugar</option>
		<option value="Sugar syrup">Sugar syrup</option>
		<option value="Sweet Vermouth">Sweet Vermouth</option>
		<option value="Tea">Tea</option>
		<option value="Tequila">Tequila</option>
		<option value="Tia maria">Tia maria</option>
		<option value="Tomato juice">Tomato juice</option>
		<option value="Tonic water">Tonic water</option>
		<option value="Triple sec">Triple sec</option>
		<option value="Vanilla ice-cream">Vanilla ice-cream</option>
		<option value="Vanilla vodka">Vanilla vodka</option>
		<option value="Vodka">Vodka</option>
		<option value="Water">Water</option>
		<option value="Watermelon">Watermelon</option>
		<option value="Whiskey">Whiskey</option>
		<option value="Whiskey sour mix">Whiskey sour mix</option>
		<option value="White Creme de Menthe">
		  White Creme de Menthe
		</option>
		<option value="White Rum">White Rum</option>
		<option value="White wine glass">White wine glass</option>
		<option value="Wild Turkey">Wild Turkey</option>
		<option value="Wine">Wine</option>
		<option value="Woodruff syrup">Woodruff syrup</option>
		<option value="Yoghurt">Yoghurt</option>
	 </select>
	 <label for="quantity-${i}" class="form__label description description-3  ingredient-label-2">Quantity:</label>
	 <input type="text" class="form__input ingredient-input-2" id="quantity-${i}" name="quantity-${i}" required />
	
</div>`;
    this.ingredientsElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerOpenAddWindow() {
    this.addOpenButton.addEventListener("click", (event) => {
      this.addWindow.classList.remove("hidden");
    });
  }
  addHandlerHideAddWindow() {
    this.addCloseArrow.addEventListener("click", (event) => {
      this.addWindow.classList.add("hidden");
    });
  }
  addHandlerSetIngredients() {
    this.ingredientsCount.addEventListener("change", (event) => {
      const ingredientCountValue = +this.ingredientsCount.value;
      this.ingredientsElement.innerHTML = "";
      for (let i = 1; i <= ingredientCountValue; i++) {
        this.generateIngredientsMarkup(i);
      }
    });
  }
  addHandlerUpload(handler) {
    this.uploadButton.addEventListener("click", (event) => {
      event.preventDefault();
      const newCocktailArray = [...new FormData(this.parentElement)];
      const newCocktailObject = Object.fromEntries(newCocktailArray);
      handler(newCocktailObject);
    });
  }
}
export default new addView();

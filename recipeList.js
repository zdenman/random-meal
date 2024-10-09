export default function updateRecipeList(recipes) {
  // Clear the current list of recipes
  mealList.innerHTML = "";

  // Creating list of recipes-------------
  recipes.forEach((recipe) => {
    const mealListSingleItem = document.createElement("div");
    mealListSingleItem.classList.add("meal-list-item");
    mealListSingleItem.textContent = recipe.title;

    const addIngredientButton = document.createElement("button");
    addIngredientButton.textContent = "+";
    const recipeLink = document.createElement("a");
    recipeLink.href = recipe.link;
    recipeLink.classList.add("recipe-link");
    recipeLink.textContent = "Zdroj";
    addIngredientButton.addEventListener("click", () => {
      //   console.log(`Opening modal for recipe ID: ${recipe.id}`);
      //   console.log(recipes)
      openModal(recipe.id);
    });
    // Opening modal with recipe details
    mealListSingleItem.addEventListener("click", () => {
      console.log(`Opening modal for recipe ID: ${recipe.id}`);
    });
    if (recipe.link) {
      mealListSingleItem.appendChild(recipeLink);
    }
    // mealListSingleItem.appendChild(recipeLink);
    mealListSingleItem.appendChild(addIngredientButton);
    mealList.appendChild(mealListSingleItem);
  });
}

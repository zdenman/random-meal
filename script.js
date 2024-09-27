const meal = document.querySelector("#meal");
const buttonSubmit = document.querySelector("#button-submit");
const result = document.querySelector(".result");
const mealList = document.querySelector(".meal-list");
let genJedlo = document.querySelector("#gen-jedlo");
let recipes = [
  {
    id: 1727425558221,
    title: "Lazanje",
    ingredients: ["kory", "pretlak", "mletvo meso"],
    link: "",
  },
  {
    id: 1727426707989,
    title: "Vajcia",
    ingredients: ["vajcia", "olej"],
    link: "",
  },
];

let recepty = [
  "Lazanje",
  "Cuketovy gulas",
  "Bob",
  "Makaroni Syr Slanina",
  "Kuracie s krumplami",
  "Kuracie meso s ryzov a zeleninov",
  "Krumple na tapsi",
  "Bolognese",
  "Carbonara",
  "Pizza",
  "Lepna",
  "Panzeroty",
  "Kuracie nugetky",
  "Ryzovie rezance s kuracim mesom",
];

// List of meal from array
recepty.forEach((recept) => {
  //   console.log(recept);
  const html = `<li>${recept}</li>`;
  mealList.insertAdjacentHTML("beforeend", html);
});

function showRandomRecipe() {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // Round up to the nearest integer
    max = Math.floor(max); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Example usage:
  const randomInt = getRandomIntInclusive(0, recepty.length);
  // Showing random result on the page from recepty array
  result.textContent = recepty[randomInt];
}

// Adding recipe on click----------------- + Enter
function addRecipe() {
  // console.log(meal.value);
  // Adding recipe to the recipe object
  const newRecipe = {
    id: Date.now(),
    title: meal.value.trim(),
    ingredients: [],
    link: "",
  };
  recipes.push(newRecipe);
  // Showing random result on the page from recepty array
  //   result.textContent = recipes[randomInt];
  // Adding meal from input to the array
  recepty.push(meal.value);
  // Clearing input field
  mealList.innerHTML = "";
}

// Updating recipe list ---------------------------------------
function updateRecipeList() {
  // Clear the current list of recipes
  mealList.innerHTML = "";

  // Creating list of recipes-------------
  recipes.forEach((recipe) => {
    //   console.log(recept);
    // const html = `<li>${recipe.title}</li>
    // <p class="ingredients-container">${[...recipe.ingredients]}</p></br>`;
    // mealList.insertAdjacentHTML("beforeend", html);
    const mealListSingleItem = document.createElement("li");
    mealListSingleItem.textContent = recipe.title;

    const addIngredientButton = document.createElement("button");
    addIngredientButton.textContent = "+";
    addIngredientButton.addEventListener("click", () => {
      addIngredient(recipe.id);
    });
    mealListSingleItem.appendChild(addIngredientButton);
    mealList.appendChild(mealListSingleItem);
  });
  //   const mealListItems = document.querySelectorAll(".meal-list li");

  //   mealListItems.forEach((mealItem) => {
  //     mealItem.addEventListener("click", () => {
  //       let ingContainer = document.querySelector(".ingredients-container");
  //       ingContainer.classList.toggle("show");
  //       console.log("clicked on ingredients");
  //     });
  //   });
}

function addIngredient(recipeId) {
  const ingredient = prompt("enter ingredients:");
  if (ingredient) {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      recipe.ingredients.push(ingredient);
      console.log(recipes);
    }
  }
}

//  Adding recipe on click----------------- + Button
buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addRecipe();
  updateRecipeList();
  console.log(recipes);
});

// Show random recipe on button click
genJedlo.addEventListener("click", (e) => {
  console.log("click");
  showRandomRecipe();
});

meal.addEventListener("focus", (e) => {
  meal.value = "";
});

// const mealListItems = document.querySelectorAll(".meal-list li");

// mealListItems.forEach((mealItem) => {
//   mealItem.addEventListener("click", () => {});
//   let ingContainer = document.querySelector(".ingredients-container");
//   ingContainer.classList.toggle(".show");
//   console.log("clicked on ingredients");
// });

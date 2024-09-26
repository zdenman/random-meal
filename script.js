const meal = document.querySelector("#meal");
const buttonSubmit = document.querySelector("#button-submit");
const result = document.querySelector(".result");
const mealList = document.querySelector(".meal-list");
let recipes = [];

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
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Round up to the nearest integer
  max = Math.floor(max); // Round down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage:
const randomInt = getRandomIntInclusive(0, recepty.length);
// console.log(recepty[randomInt]);

// List of meal
recepty.forEach((recept) => {
  //   console.log(recept);
  const html = `<li>${recept}</li>`;
  mealList.insertAdjacentHTML("beforeend", html);
});


// Adding recipe on click----------------- + Enter
function addRecipe() {
  console.log(meal.value);
  // Adding recipe to the recipe object
  recipes[meal.value.trim()] = {
    ingredients: []
  }
  // Showing random result on the page from recepty array
  result.textContent = recepty[randomInt];
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
  recepty.forEach((recept) => {
    //   console.log(recept);
    const html = `<li>${recept}</li>`;
    mealList.insertAdjacentHTML("beforeend", html);
  });
  const mealListItems = document.querySelectorAll(".meal-list li");
  // Adding ingredients for each recipe on click----------------- rozkliknutia +++
  const ingredients = "cestoviny, meso, zelenina, syr, mlieko, mrkva, cukor, olej, slanina, syr, korenie";
 mealListItems.forEach((item) => {
  // console.log(item)
   item.addEventListener("click", () => {
     item.insertAdjacentHTML("beforeend", `<p>${ingredients}</p>`);
   });
 });
}

//  Adding recipe on click----------------- + Button
buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addRecipe();
  updateRecipeList();


  // Adding ingredients for each recipe on click-----------------
//  const mealListItems = document.querySelectorAll(".meal-list li");
//  console.log(mealListItems);
//  const ingredients = "cestoviny, meso, zelenina, syr, mlieko, mrkva, cukor, olej, slanina, syr, korenie";
//  mealListItems.forEach((item) => {
//   console.log(item)
//    item.addEventListener("click", () => {
//      item.insertAdjacentHTML("beforeend", `<p>${ingredients}</p>`);
//    });
//  });
 console.log(recipes);
 console.log(recipes[0]);
 
});

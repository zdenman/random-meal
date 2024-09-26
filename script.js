const meal = document.querySelector("#meal");
const buttonSubmit = document.querySelector("#button-submit");
const result = document.querySelector(".result");
const mealList = document.querySelector(".meal-list");
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
  console.log(recept);
});

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  result.textContent = recepty[randomInt];
  recepty.push(meal.value);
  console.log(recepty);
});

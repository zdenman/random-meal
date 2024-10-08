// import updateRecipeList from "./recipeList.js";
document.addEventListener("DOMContentLoaded", (e) => {
  const meal = document.querySelector("#meal");
  const buttonSubmit = document.querySelector("#button-submit");
  const result = document.querySelector(".result");
  const mealList = document.querySelector(".meal-list");
  let genJedlo = document.querySelector("#gen-jedlo");
  const source = document.querySelector("#sourceLink");

  // const modal = document.getElementById("openModalBtn");
  let recipe;
  let recipeHistory = [];
  let recipes = [
    {
      id: 1727425558221,
      typ: "Obed",
      title: "Lazanje",
      ingredients: ["kory", "pretlak", "mletvo meso"],
      how: "",
      link: "",
    },
    {
      id: 1727426707989,
      typ: "Vecera",
      title: "Vajcia",
      ingredients: ["vajcia", "olej"],
      how: "",
      link: "",
    },
    {
      id: 1727851869819,
      typ: "Vecera",
      title: "Nuggets",
      ingredients: ["kuracie meso", "struhanka"],
      how: "",
      link: "",
    },
    {
      id: 1727851980212,
      typ: "Vecera",
      title: "Pizza",
      ingredients: ["podloge", "salama", "syr"],
      how: "",
      link: "https://www.pizzahut.sk/pizza/pizza-napoli",
    },
    {
      id: 1727852288026,
      typ: "Obed",
      title: "Kuracie teryaki",
      ingredients: ["kuracie meso", "kokosovy olej", "ryza"],
      how: "",
      link: "",
    },
    {
      id: 1727852709240,
      typ: "Obed",
      title: "Ovsenie vlocke s fazulou",
      ingredients: ["ovsenie vlocke", "pretlak", "fazula"],
      how: "",
      link: "",
    },
    {
      id: 1727852810786,
      typ: "Obed",
      title: "Bob",
      ingredients: ["bob", "udene meso", "mrkva"],
      how: "",
      link: "",
    },
    {
      id: 1727852879435,
      typ: "Obed",
      title: "Cuketovy gulas",
      ingredients: ["kuracie meso", "cuketa", "smotana na varenie"],
      how: "",
      link: "",
    },
  ];

  // List of meal from object on loading
  updateRecipeList();
  // recipes.forEach((recipe) => {
  //   const mealListSingleItem = document.createElement("div");
  //   mealListSingleItem.classList.add("meal-list-item");
  //   mealListSingleItem.textContent = recipe.title;

  //   const addIngredientButton = document.createElement("button");
  //   addIngredientButton.textContent = "+";
  //   const recipeLink = document.createElement("a");
  //   recipeLink.href = recipe.link;
  //   recipeLink.classList.add("recipe-link");
  //   recipeLink.textContent = "Zdroj";
  //   addIngredientButton.addEventListener("click", () => {
  //     //   console.log(`Opening modal for recipe ID: ${recipe.id}`);
  //     //   console.log(recipes)
  //     openModal(recipe.id);
  //   });
  //   // Opening modal with recipe details
  //   mealListSingleItem.addEventListener("click", () => {
  //     console.log(`Opening modal for recipe ID: ${recipe.id}`);
  //   });
  //   if (recipe.link) {
  //     mealListSingleItem.appendChild(recipeLink);
  //   }
  //   // mealListSingleItem.appendChild(recipeLink);
  //   mealListSingleItem.appendChild(addIngredientButton);
  //   mealList.appendChild(mealListSingleItem);
  // });

  function showRandomRecipe() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min); // Round up to the nearest integer
      max = Math.floor(max); // Round down to the nearest integer
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomInt;
    do {
      randomInt = getRandomIntInclusive(0, recipes.length - 1);
    } while (
      recipeHistory.slice(0, 7).includes(randomInt) &&
      recipes.length > 7
    );

    // Now randomInt is not among the last 3 numbers
    result.textContent = recipes[randomInt].title;

    // Add the new randomInt to the beginning of the history
    recipeHistory.unshift(randomInt);

    // Optionally, keep the history at 3 items max
    if (recipeHistory.length > 7) {
      recipeHistory.length = 7;
    }

    console.log(randomInt, recipeHistory);
  }

  // Adding recipe on click----------------- + Enter
  function addRecipe() {
    // console.log(meal.value);
    // Adding recipe to the recipe object
    const newRecipe = {
      id: Date.now(),
      typ: "",
      title: meal.value.trim(),
      ingredients: [],
      how: "",
      link: "",
    };
    recipes.push(newRecipe);
    // Showing random result on the page from recepty array
    //   result.textContent = recipes[randomInt];
    // Adding meal from input to the array
    // recepty.push(meal.value);
    // Clearing input field
    mealList.innerHTML = "";
  }

  // Updating recipe list ---------------------------------------
  function updateRecipeList() {
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
  //   function addIngredient(recipeId) {
  //     const ingredient = prompt("enter ingredients:");
  //     if (ingredient) {
  //       recipe = recipes.find((r) => r.id === recipeId);
  //       if (recipe) {
  //         recipe.ingredients.push(ingredient);
  //         recipe.link = source.value;
  //         console.log(recipes);
  //       }
  //     }
  //   }

  //  Adding recipe on click----------------- + Button
  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addRecipe();
    updateRecipeList();
    console.log(recipes);
  });

  // Show random recipe on button click
  genJedlo.addEventListener("click", (e) => {
    //   console.log("click");
    showRandomRecipe();
  });

  meal.addEventListener("focus", (e) => {
    meal.value = "";
  });

  // Function to open the modal window
  function openModal(recipeId) {
    const recipe = recipes.find((r) => r.id === recipeId);

    let overlay = document.createElement("div");
    overlay.id = "modalOverlay";

    let modal = document.createElement("div");
    modal.id = "modalWindow";
    modal.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>Edit the recipe details below:</p>
      <form id="editRecipeForm">
        <label>Typ:</label>
        <label><input type="radio" name="typ" value="Ranajky" ${
          recipe.typ === "Ranajky" ? "checked" : ""
        }> Ranajky</label>
        <label><input type="radio" name="typ" value="Obed" ${
          recipe.typ === "Obed" ? "checked" : ""
        }> Obed</label>
        <label><input type="radio" name="typ" value="Vecera" ${
          recipe.typ === "Vecera" ? "checked" : ""
        }> Vecera</label>
        
        <label for="ingredientInput">Ingredients:</label>
        <input type="text" id="ingredientInput" placeholder="Add ingredients" value="${recipe.ingredients.join(
          ", "
        )}">
        <small>Mozte pisat aj viacej ingrediencii naraz, odelene ciarkou alebo npr. muka 100g, vajcia 3ks - toto je uplne v poriadku</small>
        
        <label for="modal-how-textarea">How to prepare:</label>
        <textarea id="modal-how-textarea" rows="5">${recipe.how}</textarea>
        <small>Tu mozte napisat trosku o postupe na pripravu, alebo aj nemusite. Napiste akuklvek poznamku. Alebo nic.</small>
        
        <label for="sourceLink">Source link:</label>
        <input type="text" id="sourceLink" value="${recipe.link}">
        <small>Mozte pridat link na original recept. Moze to byt stranka, youtube video ...alebo nemusi byt nic. <br>Ziadne pole, nie je povinne.</small>
      </form>
      <div class="button-container">
        <button id="saveRecipeBtn">Save</button>
        <button id="closeModalBtn">Close</button>
        <button id="deleteRecipeBtn">Delete</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.style.display = "block";

    document
      .getElementById("closeModalBtn")
      .addEventListener("click", function () {
        overlay.remove();
      });

    document
      .getElementById("saveRecipeBtn")
      .addEventListener("click", function () {
        saveRecipe(recipeId);
        saveRecipesToLocalStorage();
        overlay.remove();
      });
  }

  function saveRecipesToLocalStorage() {
    const recipesJSON = JSON.stringify(recipes);
    localStorage.setItem("recipes", recipesJSON);
    console.log("Recipes saved to local storage.");
  }

  function saveRecipe(recipeId) {
    const recipe = recipes.find((r) => r.id === recipeId);

    recipe.typ = document.querySelector('input[name="typ"]:checked').value; // Save the selected type
    recipe.ingredients = document
      .getElementById("ingredientInput")
      .value.split(",")
      .map((ing) => ing.trim());
    recipe.how = document.getElementById("modal-how-textarea").value;
    recipe.link = document.getElementById("sourceLink").value;

    updateRecipeList(); // Update the list with the new changes
  }

  function saveRecipe(recipeId) {
    const recipe = recipes.find((r) => r.id === recipeId);

    recipe.typ = document.querySelector('input[name="typ"]').value;
    recipe.ingredients = document
      .getElementById("ingredientInput")
      .value.split(",")
      .map((ing) => ing.trim());
    recipe.how = document.getElementById("modal-how-textarea").value;
    recipe.link = document.getElementById("sourceLink").value;

    updateRecipeList(); // Update the list with the new changes
  }

  // Add event listener to the button to open the modal
  // modal.addEventListener("click", () => {
  //   openModal(recipe.id);
  // });
}); //DOM content load end-------------------------

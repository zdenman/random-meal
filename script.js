// import updateRecipeList from "./recipeList.js";
document.addEventListener("DOMContentLoaded", (e) => {
  const meal = document.querySelector("#meal");
  const buttonSubmit = document.querySelector("#button-submit");
  const result = document.querySelector(".result");
  const mealList = document.querySelector(".meal-list");
  let genJedlo = document.querySelector("#gen-jedlo");
  const source = document.querySelector("#sourceLink");
  const importJSON = document.querySelector("#import-button");
  const exportJSON = document.querySelector("#export-button");

  // const modal = document.getElementById("openModalBtn");
  // let recipe;
  let recipeHistory = [];
  let recipes = [
    // {
    //   id: 1727425558221,
    //   typ: "Obed",
    //   title: "Lazanje",
    //   ingredients: ["kory", "pretlak", "mletvo meso"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727426707989,
    //   typ: "Vecera",
    //   title: "Vajcia",
    //   ingredients: ["vajcia", "olej"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727851869819,
    //   typ: "Vecera",
    //   title: "Nuggets",
    //   ingredients: ["kuracie meso", "struhanka"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727851980212,
    //   typ: "Vecera",
    //   title: "Pizza",
    //   ingredients: ["podloge", "salama", "syr"],
    //   how: "",
    //   link: "https://www.pizzahut.sk/pizza/pizza-napoli",
    // },
    // {
    //   id: 1727852288026,
    //   typ: "Obed",
    //   title: "Kuracie teryaki",
    //   ingredients: ["kuracie meso", "kokosovy olej", "ryza"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727852709240,
    //   typ: "Obed",
    //   title: "Ovsenie vlocke s fazulou",
    //   ingredients: ["ovsenie vlocke", "pretlak", "fazula"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727852810786,
    //   typ: "Obed",
    //   title: "Bob",
    //   ingredients: ["bob", "udene meso", "mrkva"],
    //   how: "",
    //   link: "",
    // },
    // {
    //   id: 1727852879435,
    //   typ: "Obed",
    //   title: "Cuketovy gulas",
    //   ingredients: ["kuracie meso", "cuketa", "smotana na varenie"],
    //   how: "",
    //   link: "",
    // },
  ];

  // List of meal from object on loading

  loadRecipesFromLocalStorage();

  function showRandomRecipe() {
    if (recipes.length === 0) {
      result.textContent = "Nemate ziaden pridany recept";
      return;
    }
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
      // Open recipe moddal for edit
      addIngredientButton.addEventListener("click", () => {
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
    // Buttons ------------------------
    document
      .getElementById("closeModalBtn")
      .addEventListener("click", function () {
        overlay.remove();
      });
    // Save button (edit recipe modal)
    document
      .getElementById("saveRecipeBtn")
      .addEventListener("click", function () {
        saveRecipe(recipeId);
        saveRecipesToLocalStorage(); //saving to local storage
        loadRecipesFromLocalStorage(); //updejting recipe list from local storage
        overlay.remove();
      });
    // Delete recipe
    document
      .getElementById("deleteRecipeBtn")
      .addEventListener("click", function () {
        deleteRecipe(recipeId);
        overlay.remove();
      });
  }
  // Export JSON
  exportJSON.addEventListener("click", () => {
    exportRecipes();
  });
  //save recipe to local storage function
  function saveRecipesToLocalStorage() {
    const recipesJSON = JSON.stringify(recipes);
    localStorage.setItem("recipes", recipesJSON);
    console.log("Recipes saved to local storage.");
  }
  //load recipe from local storage function
  function loadRecipesFromLocalStorage() {
    const recipesJSON = localStorage.getItem("recipes");
    if (recipesJSON) {
      recipes = JSON.parse(recipesJSON);
      console.log("Recipes loaded from local storage.");
      updateRecipeList();
    } else {
      console.log("No recipes found in local storage.");
    }
  }
  // Save recipe function used on save button while editing recipe modal
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

  function exportRecipes() {
    const dataStr = JSON.stringify(recipes, null, 2); // Pretty-print with indentation
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const a = document.createElement("a");
    a.href = url;
    a.download = "recipes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importRecipes(event) {
    console.log("importRecipes function called.");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const importedRecipes = JSON.parse(e.target.result);
          // Validate the structure if necessary
          if (Array.isArray(importedRecipes)) {
            recipes = importedRecipes;
            saveRecipesToLocalStorage(); // Optionally save to local storage
            updateRecipeList(); //update recipe list after JSON is imported
            console.log("Recipes imported successfully.");
          } else {
            console.error("Invalid data format.");
            alert(
              "Invalid file format. Please select a valid recipes JSON file."
            );
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Error reading file. Please ensure it is a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  }

  function deleteRecipe(recipeId) {
    // Confirm deletion with the user
    const confirmation = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmation) {
      // Find the index of the recipe to delete
      const index = recipes.findIndex((r) => r.id === recipeId);
      if (index !== -1) {
        // Remove the recipe from the array
        recipes.splice(index, 1);

        // Update local storage
        saveRecipesToLocalStorage();

        // Update the UI
        updateRecipeList();

        // Remove the recipe from the history if present
        recipeHistory = recipeHistory.filter((i) => i !== index);

        // Adjust indices in recipeHistory
        recipeHistory = recipeHistory.map((i) => (i > index ? i - 1 : i));

        // Provide feedback to the user
        alert("Recipe deleted successfully.");
      } else {
        alert("Recipe not found.");
      }
    }
  }

  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", importRecipes);
}); //DOM content load end-------------------------

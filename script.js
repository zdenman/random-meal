// import Driver from 'https://unpkg.com/driver.js/dist/driver.esm.js';
// import 'https://unpkg.com/driver.js/dist/driver.min.css';
// import Driver from 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.esm.js';

document.addEventListener("DOMContentLoaded", (e) => {
  const meal = document.querySelector("#meal");
  const buttonSubmit = document.querySelector("#button-submit");
  const result = document.querySelector(".result");
  const mealList = document.querySelector(".meal-list");
  let genJedlo = document.querySelector("#gen-jedlo");
  const source = document.querySelector("#sourceLink");
  const importJSON = document.querySelector("#import-button");
  const exportJSON = document.querySelector("#export-button");
  const recipeCount = document.querySelector("#recipe-count-btn");
  const allRecipeCountBtn = document.querySelector("#recipe-count-btn-master");

  // const modal = document.getElementById("openModalBtn");
  // let recipe;
  let recipeHistory = [];
  let recipes = [];

  // List of meal on load
  loadRecipesFromLocalStorage();

  function showRandomRecipe() {
    if (recipes.length === 0) {
      result.textContent = "Nemate ziaden recept";
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
    mealList.innerHTML = "";

    // Creating list of recipes - - - - - - - - - - - - -
    recipes.forEach((recipe) => {
      const mealListSingleItem = document.createElement("div");
      mealListSingleItem.classList.add("meal-list-item");
      mealListSingleItem.textContent = recipe.title;

      // const addIngredientButton = document.createElement("button");
      // addIngredientButton.textContent = "+";

      // const recipeLink = document.createElement("a");
      // recipeLink.href = recipe.link;
      // recipeLink.classList.add("recipe-link");
      // recipeLink.textContent = "»";
      // Open recipe moddal for edit
      // addIngredientButton.addEventListener("click", () => {
      //   openModal(recipe.id);
      // });
      // * Open recipe preview --------------------------------------------------
      function viewRecipe(recipeId) {
        const recipe = recipes.find((r) => r.id === recipeId);

           // Generate HTML for each ingredient
        const ingredientsHtml = recipe.ingredients
        .map((ingredient) => {
        return `
        <li>
          ${ingredient.name} - ${ingredient.amount} ${ingredient.unit}
        </li>`;
        })
        .join(""); // Join all list items into a single string

        let overlay = document.createElement("div");
        overlay.id = "modalOverlay";

        let modal = document.createElement("div");
        modal.id = "modalWindow";
        modal.innerHTML = `<h2>${recipe.title}</h2>
        <ul class="ingredient-list-recipe-view">${ingredientsHtml}</ul>
        <p>${recipe.how}</p>
        <p>${recipe.link}</p>
        <div class="button-container">
        <button id="closeModalBtn">Close</button>
        <button id="upravitButton">Upravit</button>
        </div>`;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        overlay.style.display = "block";
        
        // Buttons ---------------------------------------------------------------
        // Select the button from the `modal` and add event listeners
  const addIngredientButton = modal.querySelector("#upravitButton");
  addIngredientButton.addEventListener("click", () => {
    overlay.remove();
    openModal(recipe.id);
  });
        document
          .getElementById("closeModalBtn")
          .addEventListener("click", function () {
            overlay.remove();
          });

        // Modal
        // modal.appendChild(addIngredientButton);
      }
     
      // if (recipe.link) {
      //   mealListSingleItem.appendChild(recipeLink);
      // }
      // mealListSingleItem.appendChild(recipeLink);
      // mealListSingleItem.appendChild(addIngredientButton);
      mealList.appendChild(mealListSingleItem);
       // * Opening modal with recipe details
      
       mealListSingleItem.addEventListener("click", () => {
        viewRecipe(recipe.id);
        console.log(`Opening modal for recipe ID: ${recipe.id}`);
      });
    });
    // Show all recipes count

    recipeCount.innerHTML = `${recipes.length}`;
    recipeCount.addEventListener("click", () => {
      // mealList.style.opacity = 1;
    });
  }

  //  Adding recipe on click----------------- + Button
  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addRecipe();
    saveRecipesToLocalStorage();
    loadRecipesFromLocalStorage();
    // updateRecipeList();
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
  // show / hide all recipe list
  allRecipeCountBtn.addEventListener("click", (e) => {
    mealList.classList.toggle("hide");
    console.log("clicked");
  });

  // * Function to open the modal window with recipe EDIT form
  function openModal(recipeId) {
    const recipe = recipes.find((r) => r.id === recipeId);

    let overlay = document.createElement("div");
    overlay.id = "modalOverlay";

    let modal = document.createElement("div");
    modal.id = "modalWindow";
    modal.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>Pridaj viacej info k jedlu:</p>
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
        
        <label for="ingredientInput">Ingrediencie:</label>
        <div id="ingredientsContainer"></div>
        <button type="button" id="addIngredientBtn">Add New Ingredient</button>
        <br>
        <small>Mozte pisat aj viacej ingrediencii naraz, odelene ciarkou alebo npr. muka 100g, vajcia 3ks - toto je uplne v poriadku</small>
        <br>
        <label for="modal-how-textarea">Postup na pripravu:</label><br>
        <textarea id="modal-how-textarea" rows="5">${recipe.how}</textarea><br>
        <small>Tu mozte napisat trosku o postupe na pripravu, alebo aj nemusite. Napiste akuklvek poznamku. Alebo nic.</small>
        
        <label for="sourceLink">Link:</label>
        <input type="text" id="sourceLink" value="${recipe.link}">
        <small>Mozte pridat link na original recept. Moze to byt stranka, youtube video ...alebo nemusi byt nic. <br>Ziadne pole, nie je povinne.</small>
      </form>
      <div class="button-container">
        <button id="saveRecipeBtn">Save</button>
        <button id="closeModalBtn">Close</button>
        <button id="deleteRecipeBtn">Delete</button>
      </div>
    `;

      // ^ Populate initial ingredients -----------------------------
      const ingredientsContainer = modal.querySelector("#ingredientsContainer");
      recipe.ingredients.forEach((ingredient) => addIngredientRow(ingredientsContainer, ingredient));

      // ^ Add Ingredient Button Event Listener ------------------------
      modal.querySelector("#addIngredientBtn").addEventListener("click", () => addIngredientRow(ingredientsContainer));

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    // * Buttons ------------------------
    document
      .getElementById("closeModalBtn")
      .addEventListener("click", function () {
        overlay.remove();
      });
    // Save button (edit recipe modal)
    document
      .getElementById("saveRecipeBtn")
      .addEventListener("click", function () {
        saveRecipe(recipeId, ingredientsContainer);
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

  // * Function to add a new ingredient row

function addIngredientRow(container, ingredient = { name: "", amount: "", unit: "" }) {
  const row = document.createElement("div");
  row.classList.add("ingredient-row");

  row.innerHTML = `
    <input type="text" class="ingredient-name" placeholder="Nazov ingrediencie" value="${ingredient.name}">
    <input type="text" class="ingredient-amount" placeholder="Mnoztvo" value="${ingredient.amount}">
    <input type="text" class="ingredient-unit" placeholder="Mierka (g, l, ks, ..." value="${ingredient.unit}">
    <button type="button" class="remove-ingredient">Delete</button>
  `;

  // Event listener for delete button
  row.querySelector(".remove-ingredient").addEventListener("click", () => row.remove());

  container.appendChild(row);
}

  // * Export JSON
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
  // * Save recipe function used on save button while editing recipe modal
  function saveRecipe(recipeId, ingredientsContainer) {
    const recipe = recipes.find((r) => r.id === recipeId);

    // Updating type, how, and link
    recipe.typ = document.querySelector('input[name="typ"]:checked').value;
    recipe.how = document.getElementById("modal-how-textarea").value;
    recipe.link = document.getElementById("sourceLink").value;
   // Get all ingredients from input fields
    const ingredientsData = Array.from(document.querySelectorAll('.ingredient-row')).map(row => {
      return {
        name: row.querySelector('.ingredient-name').value.trim(),
        amount: parseFloat(row.querySelector('.ingredient-amount').value),
        unit: row.querySelector('.ingredient-unit').value.trim()
      };
    });

  // Update the recipe with the new data
    recipe.ingredients = ingredientsData;

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
      "Ste si istý, že chcete odstrániť tento recept? Táto akcia je nevratná."
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
        alert("Recept bol úspešne odstránený.");
      } else {
        alert("Recept nebol nájdený.");
      }
    }
  }

  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", importRecipes);

  // const driver = window.driver.js.driver;
  // Initialize the Driver instance using the global Driver class
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#pridaj-jedlo-form",
        popover: {
          title: "Pridajte jedlo",
          description:
            "Na začiatok tu pridáme názov jedla, ktoré chceme pridať do zoznamu.",
          position: "left",
        },
      },
      {
        element: "#gen-jedlo",
        popover: {
          title: "Generovať jedlo",
          description:
            "Kliknutím na toto tlačidlo náhodne vyberiete jedlo zo zoznamu.",
          position: "right",
        },
      },
      {
        element: ".meal-list",
        popover: {
          title: "Zoznam jedál",
          description: "Tu sa zobrazuje zoznam všetkých pridaných jedál.",
          position: "top",
        },
      },
      // Add more steps as needed...
    ],
  });

  // Start the guided tour
  driverObj.drive();

  // driverObj.drive();
}); //DOM content load end-------------------------

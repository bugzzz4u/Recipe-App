const API_KEY="1e67a63cf77b481fbf32ed6e233e5cf8";
const recipeListEl= document.getElementById('recipe-list');
function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("recipe-item");

    const recipeImg = document.createElement("img");
    recipeImg.src = recipe.image;
    recipeImg.alt = "Recipe Image";

    const recipeContent = document.createElement("div");
    recipeContent.classList.add("recipe-content");

    const recipeTitle = document.createElement("h2");
    recipeTitle.innerText = recipe.title;

    const recipeIng = document.createElement("p");
    recipeIng.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    // Wrap link + fav in a div
    const linkRow = document.createElement("div");
    linkRow.classList.add("link-row");

    const recipeLink = document.createElement("a");
    recipeLink.href = recipe.sourceUrl;
    recipeLink.innerText = "View Recipe";
    recipeLink.target = "_blank";

    const favBtn = document.createElement("button");
    favBtn.classList.add("favorite-btn");
    favBtn.innerHTML = "💚";
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
      favBtn.innerHTML = favBtn.classList.contains("active") ? "❤️" : "💚";
    });

    // Append to link row
    linkRow.appendChild(recipeLink);
    linkRow.appendChild(favBtn);

    // Append all to content
    recipeContent.appendChild(recipeTitle);
    recipeContent.appendChild(recipeIng);
    recipeContent.appendChild(linkRow);

    // Build recipe card
    recipeItem.appendChild(recipeImg);
    recipeItem.appendChild(recipeContent);
    recipeListEl.appendChild(recipeItem);
  });
}

async  function getRecipes(){
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);

  const data = await response.json()
  return data.recipes
}



async function init() {
  const loadingEl = document.getElementById("loading");
  const recipeListEl = document.getElementById("recipe-list");

  // Show loading spinner
  loadingEl.style.display = "block";
  recipeListEl.style.display = "none";

  const recipes = await getRecipes();
  displayRecipes(recipes);

  // Hide loading spinner and show recipes
  loadingEl.style.display = "none";
  recipeListEl.style.display = "block";
}

init();
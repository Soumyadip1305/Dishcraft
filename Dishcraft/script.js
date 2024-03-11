const srcBox = document.querySelector('.srcBox');
const srcBtn = document.querySelector('.srcBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContainer = document.querySelector('.recipe-details-content');

const recipeCloseBtn = document.querySelector('.recipe-closeBtn');

/* get recipe */
const fetchRecipes = async (q) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes . . .</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const reciDiv = document.createElement('div');
        reciDiv.classList.add('recipe');
        reciDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        reciDiv.appendChild(button);

        recipeContainer.appendChild(reciDiv);

        // Add event listener for recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
    });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error Encountered While Retrieving Recipes . . .</h2>";
    }

}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContainer.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstruction">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p>
        </div>
    `

    recipeDetailsContainer.parentElement.style.display = "block";
}

/* close btn */

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContainer.parentElement.style.display = "none";
});
/* search btn */
srcBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInp = srcBox.value.trim();
    if(!searchInp){
        recipeContainer.innerHTML=`<h2>Please input the name of the meal into the search box.        </h2>`;
        return;
    }
    fetchRecipes(searchInp);
});
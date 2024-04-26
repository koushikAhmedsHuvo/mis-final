function searchMeal() {
  event.preventDefault();
  const searchText = document.getElementById('searchInput').value.trim();
  if (searchText === '') {
    alert('Please enter a meal name.');
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      displayMeals(data.meals);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displayMeals(meals) {
  const mealResultsDiv = document.getElementById('mealResults');
  mealResultsDiv.innerHTML = '';

  if (meals) {
    const maxResults = Math.min(meals.length, 5);
    for (let i = 0; i < maxResults; i++) {
      const meal = meals[i];
      const instructions = truncateInstructions(meal.strInstructions, 700);
      const mealCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Cooking instructions: ${instructions}</p>
            </div>
          </div>
        </div>
      `;
      mealResultsDiv.innerHTML += mealCard;
    }

    if (meals.length > 5) {
      document.getElementById('showAllBtn').classList.remove('d-none');
    } else {
      document.getElementById('showAllBtn').classList.add('d-none');
    }
  } else {
    mealResultsDiv.innerHTML = '<p>No results found.</p>';
    document.getElementById('showAllBtn').classList.add('d-none');
  }
}

function truncateInstructions(instructions, maxLength) {
  if (instructions.length <= maxLength) {
    return instructions;
  } else {
    // Find the last space before maxLength
    const truncatedText = instructions.substring(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    return truncatedText.substring(0, lastSpaceIndex) + '...';
  }
}

function showAllMeals() {
  const searchText = document.getElementById('searchInput').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      const mealResultsDiv = document.getElementById('mealResults');

      if (meals && meals.length > 5) {
        for (let i = 5; i < meals.length; i++) {
          const meal = meals[i];
          const mealCard = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions}</p>
                </div>
              </div>
            </div>
          `;
          mealResultsDiv.innerHTML += mealCard;
        }
        document.getElementById('showAllBtn').classList.add('d-none');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// # Import Modules
import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const controlRecipes = async function () {
  try {
    // Get hash from the url
    const id = window.location.hash.slice(1);

    // # Guard clause
    if (!id) return;

    // 1) # Render spinner before getting data
    recipeView.renderSpinner();

    // 2) # Calling recipe from API
    await model.loadRecipe(id);

    // 3) # Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResults());

    // Render initial pagination results
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResults(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  // Subscribers
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

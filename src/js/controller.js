import 'core-js/stable';
import 'regenerator-runtime/runtime';

// # Import Modules
import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

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
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  // Subscribers
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

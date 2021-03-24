import 'core-js/stable';
import 'regenerator-runtime/runtime';

// # Import Modules
import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const showRecipe = async function () {
  try {
    // Get hash from the url
    const id = window.location.hash.slice(1);

    // 1) # Calling recipe from API
    await model.loadRecipe(id);

    // 2) # Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);

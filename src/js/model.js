import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    console.log(data);

    // # Change object keyname format

    // ## Define as let to change later
    let { recipe } = data.data;

    // ## Change format
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    console.log(error);
  }
};

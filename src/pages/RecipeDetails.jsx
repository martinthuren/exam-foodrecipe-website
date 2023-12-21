import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import "../static/css/RecipeDetails.css";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    facade
      .fetchData(`recipes/${id}`, "GET")
      .then((data) => setRecipe(data))
      .catch((error) =>
        console.error(`Error fetching recipe with ID ${id}:`, error)
      );
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="spacer"></div>
      <div className="buttonContainerRecipeDetails">
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>
      </div>
      <div className="recipeDetailsContainer">
        <div className="recipeDetails">
          <h2>{recipe.recipeName}</h2>
          <img src={recipe.recipeImg} alt={recipe.recipeName} />
          <p>{recipe.recipeDescription}</p>
          <p>Type: {recipe.recipeType}</p>
          <p>Preparation Time: {recipe.recipePreptime} minutes</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.recipeIngredients.split(";").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Directions:</h3>
          <ol>
            {recipe.recipeDirections.split(". ").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;

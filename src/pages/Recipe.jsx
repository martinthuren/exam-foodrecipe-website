import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/css/Recipe.css";
import facade from "../util/apiFacade";

function Recipe() {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    facade.fetchData("recipes", "GET").then((data) => setDataFromServer(data));
  }, []);

  const handleDelete = (id) => {
    const updatedRecipes = dataFromServer.filter((recipe) => recipe.id !== id);
    setDataFromServer(updatedRecipes);
    facade
      .fetchData(`recipes/${id}`, "DELETE")
      .then((response) => {})
      .catch((error) => {
        console.error(`Error deleting recipe with ID ${id}:`, error);
      });
  };

  return (
    <div className="recipeContainer">
      <div className="recipes">
        {dataFromServer.map((recipe) => (
          <div className="recipeCard" key={recipe.id}>
            <p>{recipe.recipeName}</p>
            <Link to={`/recipe/${recipe.id}`}>
              <div className="recipeImage">
                <img src={recipe.recipeImg} alt={recipe.recipeName} />
              </div>
            </Link>
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
            <div className="buttonContainer">
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;

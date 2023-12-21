import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/css/Recipe.css";
import facade from "../util/apiFacade";

function Recipe() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    facade.fetchData("recipes", "GET").then((data) => {
      setDataFromServer(data);
      setFilteredRecipes(data);
    });
  }, []);

  const handleDelete = (id) => {
    const updatedRecipes = dataFromServer.filter((recipe) => recipe.id !== id);
    setDataFromServer(updatedRecipes);

    const updatedFilteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.id !== id
    );
    setFilteredRecipes(updatedFilteredRecipes);

    facade
      .fetchData(`recipes/${id}`, "DELETE")
      .then((response) => {})
      .catch((error) => {
        console.error(`Error deleting recipe with ID ${id}:`, error);
      });
  };

  const handleFilter = (type) => {
    if (type === "ALL") {
      setFilteredRecipes(dataFromServer);
    } else {
      const filtered = dataFromServer.filter(
        (recipe) => recipe.recipeType === type
      );
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div className="recipeContainer">
      <div className="filterButtons">
        <button onClick={() => handleFilter("ALL")}>All</button>
        <button onClick={() => handleFilter("BREAKFAST")}>Breakfast</button>
        <button onClick={() => handleFilter("LUNCH")}>Lunch</button>
        <button onClick={() => handleFilter("DINNER")}>Dinner</button>
        <button onClick={() => handleFilter("DESSERT")}>Dessert</button>
        <button onClick={() => handleFilter("SNACK")}>Snack</button>
        <button onClick={() => handleFilter("DRINK")}>Drink</button>
      </div>
      <div className="recipes">
        {filteredRecipes.map((recipe) => (
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
              <Link to={`/update/${recipe.id}`}>
                <button>Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;

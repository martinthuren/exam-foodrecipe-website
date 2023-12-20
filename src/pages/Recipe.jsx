import React, { useState, useEffect } from "react";
import "../static/css/Recipe.css";
import facade from "../util/apiFacade";

function Recipe() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    facade.fetchData("recipes", "GET").then((data) => setDataFromServer(data));
  };

  const handleUpdate = (id) => {
    const recipeToUpdate = dataFromServer.find((recipe) => recipe.id === id);
    setSelectedRecipe(recipeToUpdate);
  };

  const updateRecipe = (updatedRecipe) => {
    facade
      .fetchData(`recipes/${updatedRecipe.id}`, "PUT", updatedRecipe)
      .then((response) => {
        const updatedRecipes = dataFromServer.map((recipe) =>
          recipe.id === updatedRecipe.id ? response : recipe
        );
        setDataFromServer(updatedRecipes);
        setSelectedRecipe(null);
      })
      .catch((error) => {
        console.error(
          `Error updating recipe with ID ${updatedRecipe.id}:`,
          error
        );
      });
  };

  const handleSave = () => {
    if (selectedRecipe) {
      updateRecipe(selectedRecipe);
    }
  };

  const handleCancel = () => {
    setSelectedRecipe(null);
  };

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
    <>
      <div>
        <div className="recipeContainer">
          <div className="recipes">
            {dataFromServer.map((recipe) => (
              <div className="recipeCard" key={recipe.id}>
                <p>{recipe.recipeName}</p>
                <div className="recipeImage">
                  <img src={recipe.recipeImg} alt={recipe.recipeName} />
                </div>
                <p>{recipe.recipeDescription}</p>
                <p>Type: {recipe.recipeType}</p>
                <p>Preparation Time: {recipe.recipePreptime} minutes</p>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.recipeIngredients
                    .split(";")
                    .map((ingredient, index) => (
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
                  <button onClick={() => handleUpdate(recipe.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(recipe.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedRecipe && (
        <div className="editForm">
          <h2>Edit Recipe</h2>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={selectedRecipe.recipeName}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeName: e.target.value,
              })
            }
          />
          <label>Recipe Description:</label>
          <input
            type="text"
            value={selectedRecipe.recipeDescription}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeDescription: e.target.value,
              })
            }
          />
          <label>Recipe Image:</label>
          <input
            type="text"
            value={selectedRecipe.recipeImg}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeImg: e.target.value,
              })
            }
          />
          <label>Recipe Type:</label>
          <input
            type="text"
            value={selectedRecipe.recipeType}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeType: e.target.value,
              })
            }
          />
          <label>Recipe Prep Time:</label>
          <input
            type="number"
            value={selectedRecipe.recipePreptime}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipePreptime: e.target.value,
              })
            }
          />
          <label>Recipe Ingredients:</label>
          <input
            type="text"
            value={selectedRecipe.recipeIngredients}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeIngredients: e.target.value,
              })
            }
          />
          <label>Recipe Directions:</label>
          <input
            type="text"
            value={selectedRecipe.recipeDirections}
            onChange={(e) =>
              setSelectedRecipe({
                ...selectedRecipe,
                recipeDirections: e.target.value,
              })
            }
          />
          {/* Add other input fields for editing other recipe details */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default Recipe;

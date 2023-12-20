import React, { useState } from "react";
import facade from "../util/apiFacade";
import "../static/css/create-recipe.css";

function CreateRecipe() {
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    recipeImg: "",
    recipeDescription: "",
    recipeType: "",
    recipePreptime: 0,
    recipeIngredients: "",
    recipeDirections: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    facade
      .createRecipe(recipeData)
      .then((createdRecipe) => {
        console.log("New recipe created:", createdRecipe);
        setRecipeData({
          recipeName: "",
          recipeImg: "",
          recipeDescription: "",
          recipeType: "",
          recipePreptime: 0,
          recipeIngredients: "",
          recipeDirections: "",
        });
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
        // Handle error if creation fails
      });
  };

  return (
    <div className="createRecipeContainer">
      <h2>Create New Recipe</h2>
      <form className="createRecipeForm" onSubmit={handleSubmit}>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="recipeName"
          value={recipeData.recipeName}
          onChange={handleInputChange}
          required
        />
        <label>Recipe Image:</label>
        <input
          type="text"
          name="recipeImg"
          value={recipeData.recipeImg}
          onChange={handleInputChange}
          required
        />
        <label>Recipe Description:</label>
        <textarea
          name="recipeDescription"
          value={recipeData.recipeDescription}
          onChange={handleInputChange}
          required
        ></textarea>
        <label>Recipe Type:</label>
        <select
          name="recipeType"
          value={recipeData.recipeType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a recipe type</option>
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="SNACK">Snack</option>
          <option value="DESSERT">Dessert</option>
        </select>
        <label>Recipe Prep Time:</label>
        <input
          type="number"
          name="recipePreptime"
          value={recipeData.recipePreptime}
          onChange={handleInputChange}
          required
        />
        <label>Recipe Ingredients:</label>
        <textarea
          name="recipeIngredients"
          value={recipeData.recipeIngredients}
          onChange={handleInputChange}
          required
        ></textarea>
        <label>Recipe Directions:</label>
        <textarea
          name="recipeDirections"
          value={recipeData.recipeDirections}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;

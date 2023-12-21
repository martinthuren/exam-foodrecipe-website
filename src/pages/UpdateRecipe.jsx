import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import "../static/css/UpdateRecipe.css";

function UpdateRecipe() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({
    id: id,
    recipeName: "",
    recipeImg: "",
    recipeDescription: "",
    recipeType: "",
    recipePreptime: 0,
    recipeIngredients: "",
    recipeDirections: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState(false); // Add this line

  useEffect(() => {
    facade.fetchData(`recipes/${id}`, "GET").then((data) => {
      setRecipeData(data);
    });
  }, [id, updateSuccess]); // Add updateSuccess to the dependency array

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
      .updateRecipe(recipeData.id, recipeData)
      .then((updatedRecipe) => {
        console.log("Recipe updated:", updatedRecipe);
        setUpdateSuccess(true); // Set updateSuccess to true after update
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  return (
    <div className="updateRecipeContainer">
      <h2>Update Recipe</h2>
      <form className="updateRecipeForm" onSubmit={handleSubmit}>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={recipeData.id}
          disabled // Disable editing for ID field
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
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default UpdateRecipe;

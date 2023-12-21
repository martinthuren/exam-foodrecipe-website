import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import "../static/css/UpdateRecipe.css";

function UpdateRecipe() {
  const { id } = useParams(); // Assuming you're using React Router for URL parameters
  const [recipeData, setRecipeData] = useState({
    id: id, // Set the ID from URL parameter (assuming it's provided)
    recipeName: "",
    recipeImg: "",
    recipeDescription: "",
    recipeType: "",
    recipePreptime: 0,
    recipeIngredients: "",
    recipeDirections: "",
  });

  useEffect(() => {
    // Fetch the existing recipe data by ID when the component mounts
    facade.fetchData(`recipes/${id}`, "GET").then((data) => {
      setRecipeData(data);
    });
  }, [id]);

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
        // Handle successful update, such as displaying a success message
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        // Handle error, display an error message or perform necessary actions
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

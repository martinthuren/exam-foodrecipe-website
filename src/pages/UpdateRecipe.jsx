import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import "../static/css/UpdateRecipe.css";

function UpdateRecipe() {
  const { id } = useParams(); //extract id from url
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

  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    facade.fetchData(`recipes/${id}`, "GET").then((data) => {
      setRecipeData(data);
    });
  }, [id, updateSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to: ${value}`);
    setRecipeData((prevRecipeData) => ({
      ...prevRecipeData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe data to be updated:", recipeData);
    facade
      .updateRecipe(recipeData.id, recipeData)
      .then((updatedRecipe) => {
        console.log("Recipe updated:", updatedRecipe);
        setUpdateSuccess(true);
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
        <input type="text" name="id" value={recipeData.id} disabled />
        <label>Recipe Name:</label>
        <input
          type="text"
          name="recipeName"
          value={recipeData.recipeName || ""}
          onChange={handleInputChange}
          required
        />
        <label>Recipe Image:</label>
        <input
          type="text"
          name="recipeImg"
          value={recipeData.recipeImg || ""}
          onChange={handleInputChange}
          required
        />

        <label>Recipe Description:</label>
        <textarea
          name="recipeDescription"
          value={recipeData.recipeDescription || ""}
          onChange={handleInputChange}
          required
        ></textarea>
        <label>Recipe Type:</label>
        <select
          name="recipeType"
          value={recipeData.recipeType || ""}
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
          value={recipeData.recipePreptime || ""}
          onChange={handleInputChange}
          required
        />
        <label>Recipe Ingredients:</label>
        <textarea
          name="recipeIngredients"
          value={recipeData.recipeIngredients || ""}
          onChange={handleInputChange}
          required
        ></textarea>
        <label>Recipe Directions:</label>
        <textarea
          name="recipeDirections"
          value={recipeData.recipeDirections || ""}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default UpdateRecipe;

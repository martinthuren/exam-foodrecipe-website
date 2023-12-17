import React from "react";
import "../static/css/create-recipe.css";
import { useState } from "react";

function CreateRecipe() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesToChange = (event) => {
    setMinutes(event.target.value);
  };

  const options = [];
  for (let i = 1; i <= 59; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="header">
      <div>
        <h1>Create recipe</h1>
        <p>
          Please fill out the information below for your recipe, and click
          submit when you are finished
        </p>
      </div>
      <form>
        <label htmlFor="name">Name of recipe:</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <input type="text" id="instructions" name="instructions" />
        <br />
        <label htmlFor="ingredients">Ingredients:</label>
        <input type="text" id="ingredients" name="ingredients" />
        <br />
        <label htmlFor="preptime">Preptime:</label>
        <input type="text" id="preptime" name="preptime" />
        <br />
        <label htmlFor="cooktime">Cooktime: </label>
        <select
          id="hours"
          name="hours"
          value={hours}
          onChange={handleHoursChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label htmlFor="minutes"> hour(s) and </label>
        <select
          id="minutes"
          name="minutes"
          value={minutes}
          onChange={handleMinutesToChange}
        >
          {options}
        </select>
        <label htmlFor="minutes">minutes</label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateRecipe;

import React from "react";
import "../static/css/create-recipe.css";
import { useState } from "react";

function CreateRecipe() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const handleNumber1Change = (event) => {
    setNumber1(event.target.value);
  };

  const handleNumber2Change = (event) => {
    setNumber2(event.target.value);
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
          id="number1"
          name="number1"
          value={number1}
          onChange={handleNumber1Change}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label htmlFor="number1"> hour(s) and </label>
        <select
          id="number2"
          name="number2"
          value={number2}
          onChange={handleNumber2Change}
        >
          {options}
        </select>
        <label htmlFor="number2">minutes</label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateRecipe;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipe from "./pages/Recipe";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <Router>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

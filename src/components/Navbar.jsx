import React from "react";
import { Link } from "react-router-dom";
import "../static/css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/home">
          <img
            src="logo2.png"
            width="150"
            height="150"
            alt="Logo"
            className="logo-img"
          />
        </Link>
        <div className="dot"></div>
      </div>

      <div className="nav-links">
        <ul>
          <li>
            <Link to="/recipe">Recipe</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

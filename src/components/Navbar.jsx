import React from "react";
import { Link } from "react-router-dom";
import "../static/css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-section"></div>

      <div className="logo-container">
        <Link to="/">
          <img
            src="logo2.png"
            width="80"
            height="80"
            alt="Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="nav-links">
        <ul>
          <li>
            <Link to="/recipe">Show all recipes</Link>
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

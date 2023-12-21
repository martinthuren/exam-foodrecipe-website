import React from "react";
import "../static/css/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <body>
      <header>
        <h1>Welcome to The Flavourful Duo!</h1>
      </header>

      <main>
        <section class="content">
          <div class="paragraph-container">
            <p>
              Hello and welcome to The Flavourful Duo! Your number one place for
              the best recipes for delicious food!
            </p>
            <p>
              To contribute and add your first recipe, click the button "Create
              recipe" below
            </p>
            <div className="button-container">
              <Link to="/create-recipe" className="button">
                Create recipe
              </Link>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default Home;

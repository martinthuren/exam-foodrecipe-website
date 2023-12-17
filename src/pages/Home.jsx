import React from "react";
import "../static/css/pages.css";

function Home() {
  return (
    <body>
      <header>
        <h1>Welcome to The Flavourful Duo!</h1>
      </header>

      <main>
        <section class="content">
          <div class="image-container">
            <img
              src="foodhomepage.jpg"
              width="400"
              height="150"
              alt="Logo"
              className="logo-homepage"
            />
          </div>
          <div class="paragraph-container">
            <p>
              Hello and welcome to The Flavourful Duo! Your number one place for
              the best recipes for delicious food!
            </p>
            <p>
              To contribute and add your first recipe, click the button "Create
              recipe" below
            </p>
            <div class="button-container">
              <button class="button">Create recipe</button>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default Home;

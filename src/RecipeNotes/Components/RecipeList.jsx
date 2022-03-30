import { Link } from "react-router-dom";
import { useEffect } from "react";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes, removeRecipe }) => {
  const RecipeCards = recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".recipe-notes").classList.add("active");
    }, 100);
  }, []);
  return (
    <div className="flex flex-column  pa3 mw6 shadow-1 br2 center recipe-notes">
      <div className="flex justify-around items-center pa3 w-100 center">
        <h2>Recipe List </h2>
        <Link to="/editRecipe" state={{ add: "add" }}>
          <div>
            <button className="f6 button-reset  br2 ph3 pv2  bg-navy ba b--black-10 dim pointer dib white pv1 black-60">
              Add recipe
            </button>
          </div>
        </Link>
      </div>
      <div className="recipe-card pr2">{RecipeCards}</div>
    </div>
  );
};

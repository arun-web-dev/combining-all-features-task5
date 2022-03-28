import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes, removeRecipe }) => {
  const RecipeCards = recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  return (
    <div className="flex flex-column justify-around items-center pa3 mw6 shadow-1 br2 center">
      <div className="flex justify-between pa3 w-100 center">
        <h2>Recipe List </h2>
        <Link to="/addRecipe">
          <div>
            <button className="f6 button-reset  br2 ph3 pv2 mb2 bg-navy ba b--black-10 dim pointer dib white pv1 black-60">
              Add recipe
            </button>
          </div>
        </Link>
      </div>
      {RecipeCards}
    </div>
  );
};

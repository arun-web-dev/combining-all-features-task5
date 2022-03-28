import React from "react";
import Card from "../Components/Card";
const RecipeList = ({ recipes, showModal }) => {
  const modalShow = (props) => {
    showModal(props);
  };
  return (
    <div className="RecipeListApp">
      {recipes.length === 0 ? (
        <h1>Sorry No recipes Found ...</h1>
      ) : (
        recipes
          .map((recipe) => {
            return (
              <Card
                modalShow={modalShow}
                key={recipe.id}
                id={recipe.id}
                class="recipe-container"
                image={recipe.image}
                publisher={recipe.publisher}
                title={recipe.title}
              />
            );
          })
          .splice(0, 20)
      )}
    </div>
  );
};

export default RecipeList;

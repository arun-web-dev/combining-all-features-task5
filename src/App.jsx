import { useState, useEffect } from "react";
import Nabvar from "./Nabvar";
import "tachyons";
import { App as RecipeFinderApp } from "./RecipeFinder/Components/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./RecipeNotes/Components/Header";
import { RecipeList } from "./RecipeNotes/Components/RecipeList";
import AddRecipe from "./RecipeNotes/Components/AddRecipe";
import { v4 as uuidV4 } from "uuid";
import EditRecipe from "./RecipeNotes/Components/EditRecipe";
import { Modal } from "./RecipeNotes/Components/Modal";
import { RecipeDetail } from "./RecipeNotes/Components/RecipeDetail";
function App() {
  // states for RecipeList App
  const LOCAL_STORAGE_KEY = "recipes";
  const [recipes, setRecipes] = useState([]);
  const addRecipe = (recipe) => {
    const { title, publisher } = recipe;
    setRecipes([
      ...recipes,
      {
        id: uuidV4(),
        title,
        publisher,
        image: `https://picsum.photos/200/300?random=${recipe.id}`,
      },
    ]);
  };

  const modifyRecipe = (editRecipe) => {
    console.log(editRecipe);
    setRecipes(
      recipes.map((recipe) => {
        return recipe.id === editRecipe.id ? editRecipe : recipe;
      })
    );
  };
  const removeRecipe = (id) => {
    const newRecipe = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipe);
  };

  useEffect(() => {
    const loadedRecipe = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (loadedRecipe) setRecipes(loadedRecipe);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div>
      <Router>
        <Nabvar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeFinderApp />
              </>
            }
          />
          <Route
            path="/Home"
            element={
              <>
                <Nabvar /> <RecipeFinderApp />
              </>
            }
          />
          <Route
            path="/RecipesNoteHome"
            element={
              <>
                <Header />
                <RecipeList recipes={recipes} />
              </>
            }
          />
          <Route
            path="/AddRecipe"
            element={<AddRecipe addRecipe={addRecipe} />}
          />
          <Route
            path="/editRecipe"
            element={<EditRecipe modifyRecipe={modifyRecipe} />}
          />
          <Route
            path="/modal"
            element={<Modal removeRecipe={removeRecipe} />}
          />
          <Route path="/recipeDetail" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

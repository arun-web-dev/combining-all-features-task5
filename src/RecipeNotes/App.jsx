import { useState, useEffect } from "react";
import { RecipeList } from "./Components/RecipeList";
import { Header } from "./Components/Header";
import AddRecipe from "./Components/AddRecipe";
import { v4 as uuidV4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Modal } from "./Components/Modal";
import { RecipeDetail } from "./Components/RecipeDetail";
import EditRecipe from "./Components/EditRecipe";

function App() {
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
        <Header />
        <Routes>
          <Route path="/" element={<RecipeList recipes={recipes} />} />
          <Route
            path="/addRecipe"
            element={<AddRecipe addRecipe={addRecipe} />}
          />
          <Route
            path="/modal"
            element={<Modal removeRecipe={removeRecipe} />}
          />
          <Route path="/recipeDetail" element={<RecipeDetail />} />
          <Route
            path="/editRecipe"
            element={<EditRecipe modifyRecipe={modifyRecipe} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

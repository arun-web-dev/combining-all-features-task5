import React, { Component } from "react";
import RecipeList from "./RecipeList";
import { recipes } from "../API/recipe";
import SearchBox from "./Searchbox";

export class App extends Component {
  state = {
    recipes: recipes,
    searchField: "",
  };

  onSearchChange = (event) => {
    this.setState({
      searchField: event.target.value,
    });
  };

  onSubmitRecipe = (event) => {
    this.loadRecipe(this.state.searchField);
  };

  loadRecipe = async function (query) {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/?search=${query}`
      );
      const data = await res.json();
      this.setState(
        (this.state.recipes = data.data.recipes.map((rec) => {
          return {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
          };
        }))
      );
      
    } catch (error) {
      console.error(`Error from model: ${error}`);
      throw error;
    }
  };

  render() {
    const filteredRecipe = this.state.recipes.filter((recipe) => {
      return recipe.title
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    return (
      <div className="tc code">
        <h1 className="f1 ma3 washed-blue">Recipe Finder</h1>
        <SearchBox
          searchChange={this.onSearchChange}
          submitRecipe={this.onSubmitRecipe}
        />
        <RecipeList recipes={filteredRecipe} optionalRecipe={recipes} />
      </div>
    );
  }
}

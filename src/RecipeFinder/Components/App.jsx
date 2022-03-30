import React, { Component } from "react";
import RecipeList from "./RecipeList";
import { recipes } from "../API/recipe";
import SearchBox from "./Searchbox";
import RecipeDetail from "./RecipeDetail";

export class App extends Component {
  state = {
    recipes: recipes,
    searchField: "",
    showModalRecipe: "",
    modalIsActive: false,
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
  componentDidMount() {
    setTimeout(
      () => document.querySelector(".recipe-finder").classList.add("active"),
      100
    );
  }

  showModal = (props) => {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    this.setState({
      showModalRecipe: {
        id: props.id,
        title: props.title,
        publisher: props.publisher,
        image: props.image,
      },
      modalIsActive: true,
    });
  };

  closeModal = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    document.querySelector(".recipe-modal").classList.add("no-active");
    setTimeout(() => {
      this.setState({
        showModalRecipe: "",
        modalIsActive: false,
      });
    }, 500);
  };

  render() {
    const filteredRecipe = this.state.recipes.filter((recipe) => {
      return recipe.title
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    return (
      <>
        {this.state.showModalRecipe ? (
          <RecipeDetail
            recipe={this.state.showModalRecipe}
            closeModal={this.closeModal}
          />
        ) : (
          ""
        )}
        <div className="tc code recipe-finder-container ">
          <h1 className="f1 ma3">Recipe Finder</h1>
          <div className="recipe-finder">
            <SearchBox
              searchChange={this.onSearchChange}
              submitRecipe={this.onSubmitRecipe}
            />

            <RecipeList
              recipes={filteredRecipe}
              showModal={this.showModal}
              optionalRecipe={recipes}
            />
          </div>
        </div>
      </>
    );
  }
}

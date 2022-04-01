import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { InputElement } from "./InputElement";

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    const title = this.props.location.state?.recipe?.title;
    const publisher = this.props.location.state?.recipe?.publisher;
    const { add } = this.props?.location?.state;
    const recipes = this.props?.recipes;
    this.state = {
      title: title ? `${title}` : "",
      publisher: publisher ? `${publisher}` : "",
      isActive: false,
      titleIsValid: false,
      publisherIsValid: false,
      id: "",
      error: {
        title: "",
        publisher: "",
      },
      add,
      formValidated: false,
      editValidation: publisher ? `${publisher}` : "",
      recipes,
    };
  }
  navigationTimeOut = () => {
    return setTimeout(() => {
      this.setState({
        title: "",
        publisher: "",
        error: {
          title: "",
          publisher: "",
        },
        isActive: true,
      });
    }, 1000);
  };

  updateRecipe = (e) => {
    e.preventDefault();
    const recipeList = this.state.recipes;

    let filteredRecipeName = recipeList.filter((recipe) => {
      return recipe.title === this.state.title;
    });

    if (filteredRecipeName.length > 0) {
      this.setState({
        titleIsValid: true,
        error: {
          title: "Title already exsists",
        },
      });
      return alert("Title alreay exsists");
    }

    const { title, publisher } = this.state;
    if (!title || !publisher) return;
    this.props.addRecipe({ title, publisher });
    this.setState({
      formValidated: true,
    });
    this.navigationTimeOut();
  };

  editRecipe = (e) => {
    e.preventDefault();
    const { title, publisher } = this.state;
    const { id } = this.props.location.state.recipe;
    if (!title || !publisher) return;
    this.props.modifyRecipe({ title, publisher, id });
    this.setState({
      formValidated: true,
    });
    this.navigationTimeOut();
  };

  titleSelector = (e) => {
    const addRecipe = this.state.add && "Add Recipe";
    const editRecipe = "Edit Recipe";
    return addRecipe ? addRecipe : editRecipe;
  };
  recipeFunctionSelector = (e) => {
    e.preventDefault();
    const addRecipe = this.state.add && "Add Recipe";
    addRecipe ? this.updateRecipe(e) : this.editRecipe(e);
  };

  validateForm = (id, value) => {
    const recipeList = this.state.recipes;
    console.log(recipeList);
    switch (id) {
      case "title":
        let filteredRecipeName = recipeList.filter((recipe) => {
          return recipe.title === value;
        });
        if (filteredRecipeName.length > 0) {
          this.setState({
            titleIsValid: true,
            error: {
              title: "Title already exsists.Please choose another one",
            },
          });
        } else if (value.length >= 2) {
          this.setState({
            titleIsValid: false,
            error: {
              title: "Title is valid",
            },
          });
        } else {
          this.setState({
            titleIsValid: true,
            error: {
              title: "Title must be 2 to 20 charcter long",
            },
          });
        }
        break;

      case "publisher":
        let filteredRecipe = recipeList.filter((recipe) => {
          return recipe.publisher === value;
        });
        const filteredRecipeValidator = this.state.editValidation;
        if (
          filteredRecipe.length > 0 &&
          filteredRecipe[0].publisher === filteredRecipeValidator
        ) {
          this.setState({
            error: {
              publisher: "Title is Valid",
            },
            publisherIsValid: true,
          });
        } else if (filteredRecipe.length > 0) {
          this.setState({
            error: {
              publisher: "Publisher already exsists",
            },
            publisherIsValid: false,
          });
        } else if (value.length >= 4) {
          this.setState({
            error: {
              publisher: "Publisher is Valid",
            },
            publisherIsValid: true,
          });
        } else {
          this.setState({
            error: {
              publisher: "Need to be larger than 2 character",
            },
            publisherIsValid: false,
          });
        }
        break;

      default:
        break;
    }
  };

  changeState = (e) => {
    const { id, value } = e.target;
    id === "title" && this.setState({ title: value, id });
    id === "publisher" && this.setState({ publisher: value, id });
    this.validateForm(id, value);
  };

  componentDidMount() {
    setTimeout(() => {
      document.querySelector(".edit-recipe").classList.add("active");
    }, 50);
  }

  cancelRecipeHandler = (e) => {
    e.preventDefault();
    this.setState({
      isActive: true,
    });
  };

  render() {
    const { title, publisher, isActive } = this.state;
    return (
      <>
        {isActive ? (
          <Navigate to="/RecipesNoteHome" />
        ) : (
          <main className="pa4 black-80 mw6 mt4 center shadow-1 edit-recipe">
            <form
              className="measure center"
              onSubmit={this.recipeFunctionSelector}
            >
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">
                  {this.titleSelector()}
                </legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Title</label>
                  <InputElement
                    name="title"
                    value={title}
                    type="text"
                    id="title"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter title"
                  />

                  <div
                    className={
                      this.state.titleIsValid ? "mt2 red" : "mt2 green b"
                    }
                  >
                    {this.state.error.title}
                  </div>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Publisher</label>
                  <InputElement
                    name="publisher"
                    value={publisher}
                    id="publisher"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter your name to publish"
                  />
                  <div
                    className={
                      !this.state.publisherIsValid ? "mt2 red" : "mt2 green b"
                    }
                  >
                    {this.state.error.publisher}
                  </div>
                </div>
              </fieldset>
              <div>
                <button
                  className={
                    !this.state.publisherIsValid
                      ? "b ph3 pv2 input-reset ba b--black bg-transparent  disabled f6 dib"
                      : "b ph3 pv2 input-reset ba b--black bg-transparent grow  pointer f6 dib"
                  }
                  type="submit"
                  disabled={!this.state.publisherIsValid}
                >
                  {this.titleSelector()}
                </button>
                <button
                  className="b ph3 pv2 ml3 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  onClick={this.cancelRecipeHandler}
                >
                  Cancel
                </button>
              </div>
              <div>
                {this.state.formValidated ? (
                  <p className="pv2 ph3 ba b--black bg-green white b f6 dib">
                    Sucess
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </main>
        )}
      </>
    );
  }
}
export default function (props) {
  const location = useLocation();
  return <EditRecipe {...props} location={location} />;
}

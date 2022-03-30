import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { InputElement } from "./InputElement";

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    const title = this.props.location.state?.recipe?.title;
    const publisher = this.props.location.state?.recipe?.publisher;
    const { add } = this.props?.location?.state;
    this.state = {
      title: title ? `${title}` : "",
      publisher: publisher ? `${publisher}` : "",
      isActive: false,
      add,
    };
  }

  updateRecipe = (e) => {
    e.preventDefault();
    const { title, publisher } = this.state;
    if (!title || !publisher) return;
    this.props.addRecipe({ title, publisher });
    this.setState({
      title: "",
      publisher: "",
      isActive: true,
    });
  };

  editRecipe = (e) => {
    e.preventDefault();
    const { title, publisher } = this.state;
    const { id } = this.props.location.state.recipe;
    if (!title || !publisher) return;
    this.props.modifyRecipe({ title, publisher, id });
    this.setState({
      title: "",
      publisher: "",
      formErrors: { email: "", password: "" },
      emailisValid: false,
      passwordisValid: false,
      formValid: false,
      isActive: true,
    });
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

  changeState = (e) => {
    console.log("im called", e);
    const { id, value, maxLength } = e.target;
    id === "title" && this.setState({ title: value.slice(0, maxLength) });
    id === "publisher" &&
      this.setState({ publisher: value.slice(0, maxLength) });
  };

  componentDidMount() {
    setTimeout(() => {
      document.querySelector(".edit-recipe").classList.add("active");
    }, 50);
  }

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
                    value={title}
                    type="text"
                    id="title"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter title"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Publisher</label>
                  <InputElement
                    value={publisher}
                    id="publisher"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter your name to publish"
                  />
                </div>
              </fieldset>
              <div>
                <button
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                >
                  {this.titleSelector()}
                </button>
                <button
                  className="b ph3 pv2 ml3 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      isActive: true,
                    });
                  }}
                >
                  Cancel
                </button>
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

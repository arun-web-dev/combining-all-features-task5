import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";

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
                  <input
                    maxLength="20"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    name={title}
                    id="title"
                    value={title}
                    required
                    placeholder="enter title"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Publisher</label>
                  <input
                    maxLength="30"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    id="publisher"
                    value={publisher}
                    placeholder="enter your name to publish"
                    required
                  />
                </div>
              </fieldset>
              <div>
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value={this.titleSelector()}
                />
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

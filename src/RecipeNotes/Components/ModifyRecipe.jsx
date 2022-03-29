import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    const { title, publisher } = this.props.location.state.recipe;
    this.state = {
      title: `${title}`,
      publisher: `${publisher}`,
      isActive: false,
    };
  }

  editRecipe = (e) => {
    e.preventDefault();
    const { title, publisher } = this.state;
    const { id } = this.props.location.state.recipe;
    if (!this.state.title || !this.state.publisher) return;
    this.props.modifyRecipe({ title, publisher, id });
    this.setState({
      title: "",
      publisher: "",
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
          <main className="pa4 black-80 mw6 mt4  center shadow-1">
            <form className="measure center" onSubmit={this.editRecipe}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Edit Recipe</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">
                    Title
                  </label>
                  <input
                    onChange={(e) =>
                      this.setState({
                        title: e.target.value,
                      })
                    }
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    name={title}
                    id="title"
                    value={title}
                    required
                    placeholder="add your recipe title"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Publisher
                  </label>
                  <input
                    onChange={(e) =>
                      this.setState({
                        publisher: e.target.value,
                      })
                    }
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    id="publisher"
                    value={publisher}
                    placeholder="add your name to publish"
                    required
                  />
                </div>
              </fieldset>
              <div>
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Update Recipe"
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

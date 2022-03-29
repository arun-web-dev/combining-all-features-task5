import { Component } from "react";
import { Navigate } from "react-router-dom";

export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      publisher: "",
      isActive: false,
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

  changeSetState = (e) => {
    console.log(e);
  };

  render() {
    const { title, publisher, isActive } = this.state;
    return (
      <>
        {isActive ? (
          <Navigate to="/RecipesNoteHome" />
        ) : (
          <main className="pa4 black-80 mw6  mt4 center shadow-1">
            <form className="measure center" onSubmit={this.updateRecipe}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Add Recipe</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">
                    Title
                  </label>
                  <input
                    onChange={changeSetState}
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
                    value={publisher}
                    onChange={(e) =>
                      this.setState({
                        publisher: e.target.value,
                      })
                    }
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    id="publisher"
                    placeholder="add your name to publish"
                    required
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Add Recipe"
                />
              </div>
            </form>
          </main>
        )}
      </>
    );
  }
}

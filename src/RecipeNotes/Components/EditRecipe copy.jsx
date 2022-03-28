import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const EditRecipe = ({ modifyRecipe }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state;
  const { id, image } = location.state.recipe;
  const [title, setTitle] = useState(`${recipe.title}`);
  const [publisher, setPublisher] = useState(`${recipe.publisher}`);

  const editRecipe = (e) => {
    e.preventDefault();
    if (!title || !publisher) return;
    modifyRecipe({ title, publisher, id, image });
    setTitle("");
    setPublisher("");
    navigate("/");
  };

  return (
    <main className="pa4 black-80 mw6 center shadow-1">
      <form className="measure center" onSubmit={editRecipe}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Edit Recipe</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="title">
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setPublisher(e.target.value)}
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
  );
};

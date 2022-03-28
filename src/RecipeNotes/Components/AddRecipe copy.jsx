import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddRecipe = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const navigate = useNavigate();
  const updateRecipe = (e) => {
    e.preventDefault();
    if (!title || !publisher) return;
    addRecipe({ title, publisher });
    setTitle("");
    setPublisher("");
    navigate("/");
  };

  return (
    <main className="pa4 black-80 mw6 center shadow-1">
      <form className="measure center" onSubmit={updateRecipe}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Add Recipe</legend>
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
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
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
  );
};

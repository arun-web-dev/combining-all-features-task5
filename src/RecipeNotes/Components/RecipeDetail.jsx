import { useLocation, useNavigate } from "react-router-dom";

export const RecipeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, publisher, image } = location.state.recipe;
  const navigateToRecipeNoteHome = () => {
    navigate("/RecipesNoteHome");
  };
  return (
    <section className="tc pa3 pa2-ns">
      <article className="hide-child relative ba b--black-20 mw5 center">
        <img src={image} className="db w-100  cover" alt={title} />
        <div className="pa2 bt b--black-20">
          <a className="f2 db link dark-blue hover-blue">{title}</a>
          <p className="f4 gray mv1">{publisher}</p>
          <a
            onClick={navigateToRecipeNoteHome}
            className="link tc ph3 pv2 mt3 db bg-animate bg-dark-blue hover-bg-blue white f6 br1 pointer"
          >
            Back to home
          </a>
        </div>
      </article>
    </section>
  );
};

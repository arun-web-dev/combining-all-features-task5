export default function RecipeDetail(props) {
  const { image, title } = props.recipe;
  return (
    <div
      className="recipe-modal flex jusify-center items-center "
      onClick={props.closeModal}
    >
      <article className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 close-btn ">
        <div className="close-btn-before grow dim " onClick={props.closeModal}>
          X
        </div>
        <div className="tc">
          <img src={image} className="br-100 h3 w3 dib" title={title} />
          <h1 className="f4">{title}</h1>
          <hr className="mw3 bb bw1 b--black-10" />
        </div>
        <p className="lh-copy measure center f6 black-70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
          doloribus.Lorem Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Odio, doloribus.
        </p>
      </article>
    </div>
  );
}

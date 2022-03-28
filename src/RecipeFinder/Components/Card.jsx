const Card = (props) => {
  const { image, title, publisher, modalShow } = props;
  const showModal = () => {
    modalShow(props);
  };

  return (
    <div
      className="bg-light-green dib br3 pa3 ma2 grow bw2 tc shadow-5 recipe-container"
      onClick={showModal}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "200px", height: "200px" }}
      />
      <div>
        <h2 className="f4 ma1">{title}</h2>
        <p>{publisher}</p>
      </div>
    </div>
  );
};

export default Card;

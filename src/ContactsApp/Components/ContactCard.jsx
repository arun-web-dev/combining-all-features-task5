import { useNavigate } from "react-router-dom";

export const ContactCard = (props) => {
  console.log();
  const { id, name, email } = props.contact;
  const image = `https://picsum.photos/200/300?random=${id}`;

  const navigate = useNavigate();
  const modalHandler = (e) => {
    e.preventDefault();
    navigate("/ContactModal", { state: { id } });
  };
  return (
    <main className="w-100 center">
      <article className="dt w-100 bb b--black-05 pb2 mt2">
        <div className="dtc w2 w3-ns v-mid">
          <img
            src={`https://picsum.photos/200/300?random=${image}`}
            className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"
            alt={name}
          />
        </div>
        <div
          className="dtc v-mid pl3 pointer"
          onClick={() => {
            navigate("/contactDetail", {
              state: { contact: { ...props.contact, image } },
            });
          }}
        >
          <h1 className="f6 f5-ns fw6 lh-title black mv0">{name} </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">{email}</h2>
        </div>
        <div className="dtc v-mid">
          <form className="w-100 tr">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/editContact", {
                  state: { contact: props.contact, edit: "edit" },
                });
              }}
              className="f6 button-reset bg-white ba b--black-10 mr2  dim pointer pv1 ph2 black-60"
            >
              Edit
            </button>
            <button
              onClick={modalHandler}
              className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 ph2 black-60"
            >
              Delete
            </button>
          </form>
        </div>
      </article>
    </main>
  );
};

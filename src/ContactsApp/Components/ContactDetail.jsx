import { useLocation, useNavigate } from "react-router-dom";

export const ContactDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, image } = location.state.contact;
  return (
    <section className="tc pa3 pa2-ns">
      <article className="hide-child relative ba b--black-20 mw5 center">
        <img src={image} className="db w-100  cover" alt={name} />
        <div className="pa2 bt b--black-20">
          <a className="f2 db link dark-blue hover-blue">{name}</a>
          <p className="f4 gray mv1">{email}</p>
          <a
            onClick={() => {
              navigate("/ContactAppHome");
            }}
            className="link tc ph3 pv2 mt3 db bg-animate bg-dark-blue hover-bg-blue white f6 br1 pointer"
          >
            Back to home
          </a>
        </div>
      </article>
    </section>
  );
};

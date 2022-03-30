import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const ContactModal = ({ removeContact }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteContactHandler = (e) => {
    removeContact(location.state.id);
    navigate("/ContactAppHome");
  };
  const navigateToContactAppHome = (e) => {
    e.preventDefault();
    navigate("/ContactAppHome");
  };
  useEffect(() => {
    document.querySelector(".contactModal").classList.add("active");
  }, []);

  return (
    <div className="flex flex-column justify-center align-center mw6 shadow-1 br2 center h--100 contactModal">
      <div className="center">
        <h1>Are you Sure want to delete?</h1>
      </div>
      <div className="flex justify-center">
        <div className="pointer">
          <a
            onClick={deleteContactHandler}
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy"
          >
            Confirm
          </a>
        </div>
        <div className="pointer">
          <a
            onClick={navigateToContactAppHome}
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy ml2 cancel"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

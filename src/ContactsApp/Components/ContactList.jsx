import { Link } from "react-router-dom";
import { ContactCard } from "./ContactCard";
import { useEffect } from "react";
export const ContactList = ({ contacts, removeContact }) => {
  const ContactCards = contacts.map((contact) => (
    <ContactCard key={contact.id} contact={contact} />
  ));

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".contact-notes").classList.add("active");
    }, 100);
  }, []);
  return (
    <div className="flex flex-column pa3 mw6 shadow-1 br2 center contact-notes">
      <div className="flex justify-around items-center pa3 w-100 center">
        <h2>Contact List </h2>
        <Link to="/editContact" state={{ add: "add" }}>
          <div>
            <button className="f6 button-reset  br2 ph3 pv2  bg-navy ba b--black-10 dim pointer dib white pv1 black-60">
              Add contact
            </button>
          </div>
        </Link>
      </div>
      {ContactCards}
    </div>
  );
};

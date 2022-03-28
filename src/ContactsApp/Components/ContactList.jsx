import { Link } from "react-router-dom";
import { ContactCard } from "./ContactCard";

export const ContactList = ({ contacts, removeContact }) => {
  const ContactCards = contacts.map((contact) => (
    <ContactCard key={contact.id} contact={contact} />
  ));
  return (
    <div className="flex  pa3 mw6 shadow-1 br2 center">
      <div className="flex justify-around items-center pa3 w-100 center">
        <h2>Contact List </h2>
        <Link to="/addContact">
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

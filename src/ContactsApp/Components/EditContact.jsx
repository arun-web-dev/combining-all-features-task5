import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";

class EditContact extends Component {
  constructor(props) {
    super(props);
    const name = this.props.location.state?.contact?.name;
    const email = this.props.location.state?.contact?.email;
    const { add } = this.props?.location?.state;
    this.state = {
      name: name ? `${name}` : "",
      email: email ? `${email}` : "",
      isActive: false,
      add,
    };
  }

  updateContact = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    if (!name || !email) return;
    this.props.addContact({ name, email });
    this.setState({
      name: "",
      email: "",
      isActive: true,
    });
  };

  editContact = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { id } = this.props.location.state.contact;
    if (!this.state.name || !this.state.email) return;
    this.props.modifyContact({ name, email, id });
    this.setState({
      name: "",
      email: "",
      isActive: true,
    });
  };
  titleSelector = (e) => {
    const addContact = this.state.add && "Add Contact";
    const editContact = "Edit Contact";
    return addContact ? addContact : editContact;
  };
  contactFunctionSelector = (e) => {
    e.preventDefault();
    const addContact = this.state.add && "Add Contact";
    addContact ? this.updateContact(e) : this.editContact(e);
  };

  changeState = (e) => {
    const { id, value, maxLength } = e.target;
    id === "name" && this.setState({ name: value.slice(0, maxLength) });
    id === "email" && this.setState({ email: value.slice(0, maxLength) });
  };
  render() {
    const { name, email, isActive } = this.state;
    return (
      <>
        {isActive ? (
          <Navigate to="/ContactAppHome" />
        ) : (
          <main className="pa4 black-80 mw6 mt4 center shadow-1">
            <form
              className="measure center"
              onSubmit={this.contactFunctionSelector}
            >
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">
                  {this.titleSelector()}
                </legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Name</label>
                  <input
                    maxLength="20"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    name={name}
                    id="name"
                    value={name}
                    required
                    placeholder="enter your name"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Phone Number</label>
                  <input
                    maxLength="12"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="number"
                    id="email"
                    value={email}
                    placeholder="enter your number"
                    required
                  />
                </div>
              </fieldset>
              <div>
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value={this.titleSelector()}
                />
              </div>
            </form>
          </main>
        )}
      </>
    );
  }
}
export default function (props) {
  const location = useLocation();
  return <EditContact {...props} location={location} />;
}

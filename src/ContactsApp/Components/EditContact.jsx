import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { InputElement } from "../../RecipeNotes/Components/InputElement";
InputElement;

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

  componentDidMount() {
    setTimeout(() => {
      document.querySelector(".edit-contact").classList.add("active");
    }, 50);
  }

  render() {
    const { name, email, isActive } = this.state;
    return (
      <>
        {isActive ? (
          <Navigate to="/ContactAppHome" />
        ) : (
          <main className="pa4 black-80 mw6 mt4 center shadow-1 edit-contact">
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
                  <InputElement
                    value={name}
                    id="name"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter your name"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Phone Number</label>
                  <InputElement
                    value={email}
                    type="number"
                    id="email"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter your number"
                  />
                </div>
              </fieldset>
              <div>
                <button
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                >
                  {this.titleSelector()}
                </button>
                <button
                  className="b ph3 pv2 ml3 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      isActive: true,
                    });
                  }}
                >
                  Cancel
                </button>
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

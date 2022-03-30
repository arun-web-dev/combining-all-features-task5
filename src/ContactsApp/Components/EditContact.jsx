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
      nameIsValid: false,
      numberIsValid: false,
      error: {
        name: "",
        number: "",
      },
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
    e.persist();
    const { id, value } = e.target;
    id === "name" && this.setState({ name: value });
    id === "email" && this.setState({ email: +value });

    if (id === "email") {
      if (this.state.email.toString().length === 9) {
        this.setState({
          error: {
            number: "Number is valid",
          },
          numberIsValid: true,
        });
      } else {
        this.setState({
          error: {
            number: "Enter a valid 10 digit mobile number",
          },
          numberIsValid: false,
        });
      }
    }

    if (id === "name") {
      if (this.state.name.length > 15) {
        this.setState({
          nameIsValid: true,
          error: {
            name: "Name must below 20 characters long",
          },
        });
      } else {
        this.setState({
          nameIsValid: false,
          error: {
            name: "",
          },
        });
      }
    }
  };
  cancelContactHanler = (e) => {
    e.preventDefault();
    this.setState({
      isActive: true,
    });
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
                  <div
                    className={
                      !this.state.nameIsValid ? "mt2 red" : "mt2 green b"
                    }
                  >
                    {this.state.error.name}
                  </div>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Phone Number</label>
                  <InputElement
                    value={email}
                    type="tel"
                    id="email"
                    onChange={this.changeState.bind(this.changeState)}
                    placeholder="enter numbers only"
                  />

                  <div
                    className={
                      !this.state.numberIsValid ? "mt2 red" : "mt2 green b"
                    }
                  >
                    {this.state.error.number}
                  </div>
                </div>
              </fieldset>
              <div>
                <button
                  className={
                    !this.state.numberIsValid
                      ? "b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                      : "b ph3 pv2 input-reset ba b--black bg-transparent grow  pointer f6 dib"
                  }
                  type="submit"
                  disabled={!this.state.numberIsValid}
                >
                  {this.titleSelector()}
                </button>
                <button
                  className="b ph3 pv2 ml3 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  onClick={this.cancelContactHanler}
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

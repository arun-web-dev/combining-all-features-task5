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
      id: "",
      error: {
        name: "",
        number: "",
      },
      add,
      formValidated: false,
    };
  }

  updateContact = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    if (!name || !email) return;
    this.props.addContact({ name, email });
    this.setState({
      formValidated: true,
    });

    setTimeout(() => {
      this.setState({
        name: "",
        email: "",
        error: {
          name: "",
          number: "",
        },
        isActive: true,
      });
    }, 1000);
  };

  editContact = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { id } = this.props.location.state.contact;
    if (!this.state.name || !this.state.email) return;
    this.props.modifyContact({ name, email, id });
    this.setState({
      formValidated: true,
    });
    setTimeout(() => {
      this.setState({
        name: "",
        email: "",
        error: {
          name: "",
          number: "",
        },
        isActive: true,
      });
    }, 1000);
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

  validateForm = (id, value) => {
    switch (id) {
      case "name":
        if (value.length >= 2) {
          this.setState({
            nameIsValid: false,
            error: {
              name: "Name is valid",
            },
          });
        } else {
          this.setState({
            nameIsValid: true,
            error: {
              name: "Name must be 2 to 20 charcter long",
            },
          });
        }
        break;

      case "email":
        let emailRegExp = /^\d{10}$/;
        if (emailRegExp.test(value)) {
          this.setState({
            error: {
              number: "Number is Valid",
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
        break;

      default:
        break;
    }
  };

  changeState = (e) => {
    const { id, value } = e.target;
    id === "name" && this.setState({ name: value, id });
    id === "email" && this.setState({ email: +value, id });
    this.validateForm(id, value);
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
                      this.state.nameIsValid ? "mt2 red" : "mt2 green b"
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
                    placeholder="enter your phone number"
                  />
                  <div
                    className={
                      !this.state.numberIsValid && !this.state.nameIsValid
                        ? "mt2 red"
                        : "mt2 green b"
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
                      ? "b ph3 pv2 input-reset ba b--black bg-transparent  disabled f6 dib"
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
              <div>
                {this.state.formValidated ? (
                  <p className="pv2 ph3 ba b--black bg-green white b f6 dib">
                    Sucess
                  </p>
                ) : (
                  ""
                )}
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

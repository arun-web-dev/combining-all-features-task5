import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";

class AddContact extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: "",
      email: "",
      isActive: false,
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
            <form className="measure center" onSubmit={this.updateContact}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Add Contact</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Name</label>
                  <input
                    maxLength="25"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="text"
                    id="name"
                    value={name}
                    required
                    placeholder="enter your name"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Phone Number</label>
                  <input
                    value={email}
                    maxLength="12"
                    onChange={this.changeState}
                    className="pa2 input-reset ba bg-transparent  w-100"
                    type="number"
                    id="email"
                    placeholder="enter your phone number"
                    required
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Add Contact"
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
  return <AddContact {...props} location={location} />;
}

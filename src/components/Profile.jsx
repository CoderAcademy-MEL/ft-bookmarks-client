import React from "react";
import { BookmarksContext } from "../context/bookmarks-context";

class Profile extends React.Component {
  static contextType = BookmarksContext;

  state = {
    changeEmail: false,
    email: "",
    changePassword: false,
    password: "",
    message: ""
  };

  handleInputChange = (event) =>
    this.setState({ [event.target.id]: event.target.value });

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    });
    const currentUser = await response.text()
    this.context.dispatch("current user", currentUser)
    this.setState({
      message: 'Credentials updated'
    })
  };

  render() {
    const { changeEmail, changePassword, message } = this.state;
    return (
      <div className="profile">
        <h1>Profile</h1>
        {message && <p>{message}</p>}
        <p>Email: {this.context.currentUser}</p>
        <div className="edit-details">
          <p
            onClick={() =>
              this.setState((state) => ({ changeEmail: !state.changeEmail }))
            }
          >
            Change email
          </p>
          {changeEmail && (
            <form onSubmit={this.onFormSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleInputChange}
              />
              <input type="submit" value="Submit" />
            </form>
          )}
          <p
            onClick={() =>
              this.setState((state) => ({
                changePassword: !state.changePassword,
              }))
            }
          >
            Change password
          </p>
          {changePassword && (
            <form onSubmit={this.onFormSubmit}>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleInputChange}
              />
              <input type="submit" value="Submit" />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;

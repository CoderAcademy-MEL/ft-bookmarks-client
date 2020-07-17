import React from "react";
import { BookmarksContext } from "../context/bookmarks-context";
import axios from "axios";

class Login extends React.Component {
  static contextType = BookmarksContext;
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          auth: { email, password }
        }
      );
      localStorage.setItem("token", response.data.jwt);
      this.props.history.push("/bookmarks");
    } catch (err) {
      this.setState({
        errMessage: "Incorrect credentials",
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <>
        <h1>Login</h1>
        {errMessage && <span data-testid="login-error" style={{ color: "red" }}>{errMessage}</span>}
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
            data-testid="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Login;

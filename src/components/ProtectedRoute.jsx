import React from "react";
import { Route, Redirect } from "react-router-dom";
import { BookmarksContext } from "../store/bookmarks-context";

class ProtectedRoute extends React.Component {
  static contextType = BookmarksContext;

  async componentDidMount() {
    if (!this.context.auth) {
      this.context.dispatch();
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const { jwt, bookmarks } = await response.json();
        localStorage.setItem("token", jwt);
        this.context.dispatch("populate", bookmarks);
      }
    } catch (err) {
      this.context.dispatch();
    }
  }

  render() {
    const { loading, auth } = this.context;
    if (auth && !loading) {
      return (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      );
    } else if (!auth) {
      return <Redirect to="/login" />;
    }
  }
}

export default ProtectedRoute;

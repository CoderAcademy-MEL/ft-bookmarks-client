import React from "react";
import { Route, Redirect } from "react-router-dom";
import { BookmarksContext } from "../store/bookmarks-context";

class ProtectedRoute extends React.Component {
  static contextType = BookmarksContext;

  async componentDidMount() {
    if (!this.context.auth) return;
    try {
      const response = await this.fetchBookmarks();
      this.handleError(response.status);
      this.setTokenAndPopulateBookmarksContext(response);
    } catch (err) {
      this.context.dispatch();
    }
  }

  handleError = (status) => {
    if (status >= 400) {
      throw new Error("Incorrect credentials");
    }
  };

  setTokenAndPopulateBookmarksContext = async (response) => {
    const { jwt, bookmarks } = await response.json();
    localStorage.setItem("token", jwt);
    this.context.dispatch("populate", bookmarks);
  };

  fetchBookmarks = async () => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

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

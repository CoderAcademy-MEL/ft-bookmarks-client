import React from "react";
import { Route, Redirect } from "react-router-dom";
import { BookmarksContext } from '../context/bookmarks-context'

class ProtectedRoute extends React.Component {
  static contextType = BookmarksContext
  state = {
    auth: false,
    loading: true,
  };

  getBookmarks = async () => {
    return await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  checkStatusCode = (response) => {
    if (response.status >= 400) {
      throw new Error("not authorized");
    }
  }

  setTokenAndDispatch = async (response) => {
    const { jwt, bookmarks, current_user: currentUser } = await response.json() 
    localStorage.setItem("token", jwt);
    this.context.dispatch("populate", { bookmarks, currentUser })
  }

  setAuth = () => this.setState({ auth: true, loading: false })

  setLoading = () => this.setLoading({ loading: false })

  async componentDidMount() {
    try {
      const response = await this.getBookmarks()
      this.checkStatusCode(response)
      await this.setTokenAndDispatch(response)
      this.setAuth()
    } catch(err) {
      this.setLoading()
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

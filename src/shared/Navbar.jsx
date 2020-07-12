import React from 'react'
import { BookmarksContext } from "../context/bookmarks-context";
import LoggedInNavbar from './LoggedInNavbar'
import LoggedOutNavbar from './LoggedOutNavbar'

class NavBar extends React.Component {
  static contextType = BookmarksContext

  render() {
    return (
      <nav>
        {this.context.currentUser || sessionStorage.getItem("auth") ? (
          <LoggedInNavbar history={this.props.history} context={this.context} />
        ) : (
          <LoggedOutNavbar />
        )}
      </nav>
    )
  }
};

export default NavBar;
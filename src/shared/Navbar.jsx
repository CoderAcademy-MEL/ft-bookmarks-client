// Navbar.jsx
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BookmarksContext } from "../context/bookmarks-context";
import LoggedInNavbar from './LoggedInNavbar'
import LoggedOutNavbar from './LoggedOutNavbar'

const NavBar = () => {
  const history = useHistory();
  const context = useContext(BookmarksContext)
  return (
    <nav>
      {context.currentUser ? (
        <LoggedInNavbar history={history} context={context} />
      ) : (
        <LoggedOutNavbar />
      )}
    </nav>
  );
};

export default NavBar;
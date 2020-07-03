// Navbar.jsx
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BookmarksContext } from "../store/bookmarks-context";

const NavBar = () => {
  const history = useHistory();
  const context = useContext(BookmarksContext)

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/bookmarks">Bookmarks</Link>
      <Link to="/bookmarks/create">Create Bookmark</Link>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Sign Up</Link>
      <span
        onClick={() => {
          localStorage.removeItem("token");
          context.dispatch("logout")
          history.push("/login");
        }}
      >
        Logout
      </span>
    </nav>
  );
};

export default NavBar;
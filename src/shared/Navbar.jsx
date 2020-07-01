// Navbar.jsx
import React from "react";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

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
          history.push("/login");
        }}
      >
        Logout
      </span>
    </nav>
  );
};

export default NavBar;
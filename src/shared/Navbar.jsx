// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/bookmarks/create">Create Bookmark</Link>
        <Link to="/secrets">Secrets</Link>
      </nav>
    );
  }
}

export default NavBar;

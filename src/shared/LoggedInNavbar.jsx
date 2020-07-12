import React from "react";
import { Link } from "react-router-dom";

const handleLogout = (props) => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("auth");
  props.context.dispatch("logout");
  props.history.push("/");
};

const LoggedInNavbar = (props) => (
  <>
    <div className="logged-in-links">
      <Link to="/">
        <span role="img" aria-label="site logo">
          🔗
        </span>
      </Link>
      <Link to="/bookmarks">Bookmarks</Link>
      <Link to="/bookmarks/create">Create Bookmark</Link>
    </div>
    <div className="welcome-user">
      <span id="logout" onClick={() => handleLogout(props)}>
        Logout
      </span>
      <Link to="/profile">Profile</Link>
    </div>
  </>
);

export default LoggedInNavbar;

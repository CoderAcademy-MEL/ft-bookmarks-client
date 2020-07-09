import React from 'react'
import { Link } from 'react-router-dom'

const LoggedInNavbar = (props) => (
  <>
    <div className="logged-in-links">
      <Link to="/bookmarks">Bookmarks</Link>
      <Link to="/bookmarks/create">Create Bookmark</Link>
      <span
        id="logout"
        onClick={() => {
          localStorage.removeItem("token");
          props.context.dispatch("logout")
          props.history.push("/");
        }}
      >
        Logout
      </span>
    </div>
    <div className="welcome-user">
      <span>{props.context.currentUser}</span>
    </div>
  </>
)

export default LoggedInNavbar
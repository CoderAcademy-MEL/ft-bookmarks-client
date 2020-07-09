import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOutNavbar = () => (
  <div className="logged-out-links">
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/sign-up">Sign Up</Link>
  </div>
)

export default LoggedOutNavbar
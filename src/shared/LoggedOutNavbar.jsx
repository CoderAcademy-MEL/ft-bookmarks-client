import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOutNavbar = () => (
  <div className="logged-out-links">
    <Link to="/"><span role="img" aria-label="site logo">🔗</span></Link>
    <Link to="/login" data-testid="login">Sign In</Link>
    <Link to="/sign-up" data-testid="sign-up">Sign Up</Link>
  </div>
)

export default LoggedOutNavbar
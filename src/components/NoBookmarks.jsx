import React from 'react'
import { Link } from 'react-router-dom'

const NoBookMarks = () => (
  <h1 data-testid="no-bookmarks" className="no-bookmarks">You haven't <Link to="/bookmarks/create">created</Link> any bookmarks yet <span role="img" aria-label="link identifier">🔗</span>!</h1>
)

export default NoBookMarks
import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment'

class Bookmarks extends React.Component {
  // initial state
  state = { bookmarks: [] };

  getBookmarks = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const bookmarks = await response.json();
    this.setState({ bookmarks: bookmarks });
  };

  deleteBookmark = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    this.getBookmarks();
  };

  renderBookmarks = () => {
    return this.state.bookmarks.map((bookmark, index) => {
      return (
        <div key={index} className="bookmark">
          <h3>{bookmark.title}</h3>
          <p>{bookmark.description}</p>
          <span>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.url}
            </a>
          </span>
          <p>{moment(bookmark.created_at).startOf('minute').fromNow()}</p>
          <div className="edit-delete-container">
            <Link to={`/bookmarks/${bookmark.id}/edit`}>Edit</Link>
            <span onClick={() => this.deleteBookmark(bookmark.id)}>Delete</span>
          </div>
          <hr />
        </div>
      );
    });
  };

  async componentDidMount() {
    this.getBookmarks();
  }

  render() {
    return <div>{this.renderBookmarks()}</div>;
  }
}

export default Bookmarks;

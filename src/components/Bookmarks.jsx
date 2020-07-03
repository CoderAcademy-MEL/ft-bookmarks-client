import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import { BookmarksContext } from '../store/bookmarks-context'

class Bookmarks extends React.Component {
  static contextType = BookmarksContext;

  deleteBookmark = async (id) => {
    this.context.dispatch("delete", id)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  renderBookmarks = () => {
    return this.context.bookmarks.map((bookmark, index) => {
      return (
        <div key={index} className="bookmark">
          <h3>{bookmark.title}</h3>
          <p>{bookmark.description}</p>
          <span>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.url}
            </a>
          </span>
          <p>{moment(bookmark.updated_at).startOf('minute').fromNow()}</p>
          <div className="edit-delete-container">
            <Link to={`/bookmarks/${bookmark.id}/edit`}>Edit</Link>
            <span onClick={() => this.deleteBookmark(bookmark.id)}>Delete</span>
          </div>
          <hr />
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderBookmarks()}</div>;
  }
}

export default Bookmarks;

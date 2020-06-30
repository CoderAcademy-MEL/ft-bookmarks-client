import React from "react";

class Bookmarks extends React.Component {
  // initial state
  state = { bookmarks: [] };

  getBookmarks = async () => {
    const response = await fetch("http://localhost:3000/bookmarks");
    const bookmarks = await response.json();
    this.setState({ bookmarks: bookmarks });
  };

  renderBookmarks = () => {
    return this.state.bookmarks.map((bookmark, index) => {
      return (
        <div key={index}>
          <h3>{bookmark.title}</h3>
          <p>{bookmark.description}</p>
          <span>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.url}
            </a>
          </span>
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

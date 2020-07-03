import React from "react";
import { BookmarksContext } from "../store/bookmarks-context";

class CreateBookmark extends React.Component {
  static contextType = BookmarksContext;

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const body = {
      bookmark: this.state,
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const bookmark = await response.json();
    this.context.dispatch("add", bookmark);
    this.props.history.push("/bookmarks");
  };

  render() {
    return (
      <div className="container">
        <h1>Create a bookmark</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={this.onInputChange}
          />
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={this.onInputChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={this.onInputChange}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateBookmark;

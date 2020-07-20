import React from "react";
import { BookmarksContext } from "../context/bookmarks-context";

class CreateBookmark extends React.Component {
  static contextType = BookmarksContext;
  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0]
      })
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    // const body = {
    //   bookmark: this.state,
    // };
    var data = new FormData()
    for (let key in this.state) {
      data.append(`bookmark[${key}]`, this.state[key])
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      }
    );
    const { image, bookmark } = await response.json();
    this.context.dispatch("add", {...bookmark, image});
    this.props.history.push("/bookmarks");
  };

  render() {
    return (
      <>
        <h1>Create a bookmark</h1>
        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={this.onInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default CreateBookmark;

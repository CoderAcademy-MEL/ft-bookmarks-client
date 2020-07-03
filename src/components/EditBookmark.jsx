import React from "react";
import { BookmarksContext } from "../store/bookmarks-context";

class EditBookmark extends React.Component {
  static contextType = BookmarksContext;

  state = {
    title: "",
    url: "",
    description: "",
    loading: true,
    id: Number(this.props.match.params.id),
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { id, title, url, description } = this.state;
    this.context.dispatch("update", { title, url, description, id });
    this.props.history.push("/bookmarks");
    fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ bookmark: { title, url, description } }),
    });
  };

  async componentDidMount() {
    const foundBookmark = this.context.bookmarks.find(
      (bookmark) => bookmark.id === this.state.id
    );
    const { title, url, description } = foundBookmark;
    this.setState({ title, url, description, loading: false });
  }

  render() {
    const { title, url, description, loading } = this.state;
    return (
      !loading && (
        <div className="container">
          <h1>Edit a bookmark</h1>
          <form onSubmit={this.onFormSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.onInputChange}
              value={title}
            />
            <label htmlFor="url">Url</label>
            <input
              type="text"
              name="url"
              id="url"
              onChange={this.onInputChange}
              value={url}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={this.onInputChange}
              value={description}
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    );
  }
}

export default EditBookmark;

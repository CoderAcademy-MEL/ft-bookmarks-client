import React from "react";
import { BookmarksContext } from '../context/bookmarks-context'

class EditBookmark extends React.Component {
  static contextType = BookmarksContext
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
    const { id, title, url, description, created_at, user_id } = this.state;
    this.context.dispatch("update", {
      title,
      url,
      description,
      id,
      created_at,
      user_id,
      updated_at: new Date(),
    });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ bookmark: { title, url, description } }),
    });
  };

  componentDidMount() {
    const foundBookmark = this.context.bookmarks.find((bookmark) => {
      return bookmark.id === this.state.id
    })
    this.setState({ ...foundBookmark, loading: false });
  }

  render() {
    const { title, url, description, loading } = this.state;
    return (
      !loading && (
        <>
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
        </>
      )
    );
  }
}

export default EditBookmark;

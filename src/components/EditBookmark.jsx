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
    image: ''
  };

  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        uploadedImage: event.target.files[0]
      })
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let { id, title, url, description, created_at, user_id, image, uploadedImage } = this.state;
    if (uploadedImage) {
      const data = new FormData();
      data.append('bookmark[image]', uploadedImage)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/image/${id}`, {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      image = await response.text()
    }
    this.context.dispatch("update", {
      title,
      url,
      description,
      id,
      created_at,
      user_id,
      updated_at: new Date(),
      image
    });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ bookmark: { title, url, description } }),
    });
    this.props.history.push("/bookmarks")
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
          <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
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
      )
    );
  }
}

export default EditBookmark;

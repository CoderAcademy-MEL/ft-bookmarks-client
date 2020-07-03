import React from "react";

function dispatch(type, value) {
  switch (type) {
    case "populate":
      this.setState({
        bookmarks: value,
      });
      break;
    case "add":
      this.setState((state) => {
        return {
          bookmarks: [...state.bookmarks, value],
        };
      });
      break;
    case "update":
      this.setState((state) => {
        const bookmarks = state.bookmarks.map((bookmark) => {
          if (value.id === bookmark.id) {
            return value;
          } else {
            return bookmark;
          }
        });
        return {
          bookmarks: bookmarks,
        };
      });
      break;
    case "delete":
      this.setState((state) => {
        const bookmarks = state.bookmarks.filter((bookmark) => {
          return value !== bookmark.id;
        });
        return {
          bookmarks: bookmarks,
        };
      });
      break;
    case "logout":
      this.setState({
        loading: true,
        auth: false,
        bookmarks: [],
      });
      break;
    case "login":
      this.setState({
        loading: false,
        auth: true,
      });
      break;
    default:
      this.setState({
        loading: false,
      });
  }
}

const BookmarksContext = React.createContext({
  bookmarks: [],
  dispatch: () => {},
  auth: "",
  loading: "",
});

export { BookmarksContext, dispatch };

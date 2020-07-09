import React from 'react'

function dispatch(action, value) {
  switch(action) {
    case "populate":
      this.setState( { bookmarks: value.bookmarks, currentUser: value.currentUser } )
      break;
    case "add":
      this.setState((state) => {
        return { bookmarks: [...state.bookmarks, value] }
      })
      break;
    case "delete": 
      this.setState((state) => {
        const bookmarks = state.bookmarks.filter((bookmark) => {
          return bookmark.id !== value
        })
        return {
          bookmarks: bookmarks
        }
      })
      break;
    case "update": 
      this.setState((state) => {
        const bookmarks = state.bookmarks.map((bookmark) => {
          if (value.id === bookmark.id) {
            return value
          } else {
            return bookmark
          }
        })
        return {
          bookmarks: bookmarks
        }
      })
      break;
    case "logout": 
      this.setState({ currentUser: false, bookmarks: [] })
      break;
    case "current user":
      this.setState({ currentUser: value })
      break;
    default: 
      console.log("in bookmarks")
  }
}

const BookmarksContext = React.createContext({
  bookmarks: [],
  dispatch: () => {},
  currentUser: false
})

export {
  BookmarksContext,
  dispatch
}
// App.jsx
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Bookmarks from "./Bookmarks";
import NoMatch from "./NoMatch";
import Navbar from "../shared/Navbar";
import CreateBookmark from "./CreateBookmark";
import EditBookmark from "./EditBookmark";
import ProtectedRoute from "./ProtectedRoute";
import Secrets from "./Secrets";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/secrets" component={Secrets} />
          <Route exact path="/bookmarks/:id/edit" component={EditBookmark} />
          <Route exact path="/bookmarks/create" component={CreateBookmark} />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default App;

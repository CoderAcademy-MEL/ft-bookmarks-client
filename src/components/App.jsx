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
import Login from "./Login";
import SignUp from "./SignUp";
import { RandomContext } from "../store/random-context";

class App extends React.Component {

  updateValue = () => {
    this.setState((state) => {
      return {value: state.value += 1}
    })
  } 

  state = { value: 1, updateValue: this.updateValue };

  render() {
    return (
      <>
        <RandomContext.Provider value={this.state}>
          <Navbar />
          <Switch>
            <ProtectedRoute
              exact
              path="/bookmarks/:id/edit"
              component={EditBookmark}
            />
            <ProtectedRoute
              exact
              path="/bookmarks/create"
              component={CreateBookmark}
            />
            <ProtectedRoute exact path="/bookmarks" component={Bookmarks} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </RandomContext.Provider>
      </>
    );
  }
}

export default App;

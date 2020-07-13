import React from "react";
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
  state = {
    auth: sessionStorage.getItem('auth'),
    token: localStorage.getItem('token')
  }
  homePageContent = () => (
    <div className="home">
      <p>
        <a href="/">HarrisonsBookmarks</a> is a demo app that I completed in my
        demo code along classes for{" "}
        <a href="https://coderacademy.edu.au/">Coder Academy</a> Fast Track
        2020-1.
      </p>
      <p>
        It uses a React client with a standard setup using a{" "}
        <a href="https://reactrouter.com/web/guides/quick-start">
          react-router-dom
        </a>{" "}
        for routing and <a href="https://momentjs.com/">moment.js</a> for
        dealing with dates.
      </p>
      <p>
        It uses a Rails backend that uses{" "}
        <a href="https://github.com/nsarno/knock">knock</a> for handling
        authentication.
      </p>
      <p>
        I've also tried to ensure the CSS makes the site mobile friendly as well
        as using <a href="https://sass-lang.com/">SASS</a> for preprocessing.
      </p>
    </div>
  );

  render() {
    const { token, auth } = this.state
    if (token && !auth) {
      return <Redirect to="/bookmarks" />
    } else {
      return this.homePageContent()
    } 
  }
}

export default Home;

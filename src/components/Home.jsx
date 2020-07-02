// Home.jsx
import React from "react";
import { RandomContext } from '../store/random-context'

class Home extends React.Component {
  render() {
    return (
      <RandomContext.Consumer>
        {context => {
          console.log(context.value)
          return (
            <h1 onClick={context.updateValue}>home</h1>
          )
        }}
      </RandomContext.Consumer> 
    ) 
  }
}

export default Home;

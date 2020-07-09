// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

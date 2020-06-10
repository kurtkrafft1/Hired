import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Hired from "./hired"

ReactDOM.render(
  <Router>
    <Hired />
  </Router>,
  document.getElementById("root")
);


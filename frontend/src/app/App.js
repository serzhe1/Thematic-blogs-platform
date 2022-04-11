import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from "../components/router/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;

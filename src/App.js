import React, { Component } from "react";
import "./App.css";
import Game from "./calculator/game";
import Jason from "./calculator/jason";
//import Data from "./calculator/data.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { result: null };
    this.propagateResult = (result) => this.setState({ result });
  }
  render() {
    const title = "React piškvorky";

    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

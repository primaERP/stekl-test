import React from "react";
//import { SafeAreaView, StyleSheet, TextInput } from "react-native";

//export default UselessTextInput;
import Data from "../calculator/data.json";

export default class Jason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mojeData: [],
    };
  }
  render() {
    const _data = nactiData(Data);

    return (
      /*
      <div>
        <h1>nazdar</h1>
        {Data.map((detail) => {
          return (
            <div>
              <h1>{detail.title}</h1>
              <p>{detail.content}</p>
            </div>
          );
        })}
      </div>
      */
      <div>
        <label class="custom-field">
          <input type="email" placeholder="&nbsp;" />
          <span class="placeholder">Enter Email</span>
          <span class="error-message" aria-live="polite">
            The email is invalid
          </span>
        </label>

        <label class="custom-field one">
          <input type="text" placeholder=" " />
          <span class="placeholder">Enter Text</span>
        </label>

        <label class="custom-field two">
          <input type="url" placeholder="&nbsp;" />
          <span class="placeholder">Enter URL</span>
        </label>

        <label class="custom-field three">
          <input type="password" placeholder="&nbsp;" />
          <span class="placeholder">Enter Password</span>
          <span class="border"></span>
        </label>
      </div>

      /*
      <div>
        <h1>nazdar</h1>
        {_data.map((detail) => {
          return (
            <div>
              <span className="nazev">{detail[0]}</span>
              <span className="vstup">{detail[1]}</span>
            </div>
          );
        })}
      </div>
      */
    );
  }
}
function nactiData(Data) {
  const _mojeData = [];
  Data.map((detail) => {
    _mojeData.push([detail.title, detail.content]);
  });
  return _mojeData;
}

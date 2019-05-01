import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Detail from "./src/view/screen/Detail/Detail";

const url = `https://facebook.github.io/react-native/docs/assets/favicon.png`;
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Detail />
      </View>
    );
  }
}

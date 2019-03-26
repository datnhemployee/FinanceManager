import React, { Component } from "react";
import { StyleSheet, Picker, View, Text } from "react-native";
import Icon from "../../../../styles/Icon";
import render from "./Home.Header.design";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { balanceLabel, currency, filter, date } = this.props;
    return render({ balanceLabel, currency, filter, date });
  }
}

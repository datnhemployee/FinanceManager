import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import Home from './src/view/screen/Home/Home';
// import SpenseRepository from "./src/repository/SpenseRepository";
import seed from './src/utils/Seed';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // await AsyncStorage.removeItem('maxPage')
    // await AsyncStorage.removeItem('wallet')
    // console.log('wallet',await AsyncStorage.getItem(`wallet`))
    // await SpenseRepository.deleteAll();
    // console.log('spense',await SpenseRepository.getAll())
    // console.log('day',await SpenseRepository.getAllDay())
    await seed(true);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Home />
        {/* <Text>dasdsa</Text> */}
      </View>
    );
  }
}
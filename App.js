<<<<<<< Updated upstream
=======
import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import Home from './src/view/screen/Home/Home';
// import SpenseRepository from "./src/repository/SpenseRepository";
import seed from './src/utils/Seed';
>>>>>>> Stashed changes

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SQLite from "react-native-sqlite-storage";
import Icon from './src/styles/Icon';

const url = `https://www.google.com/
    url?sa=i&source=images&cd=&cad=rja&
    uact=8&ved=2ahUKEwjXsda3xNjgAhVBFog
    KHY48BiUQjRx6BAgBEAU&url=https%3A%2F%2
    Fwww.pexels.com%2Fsearch%2Flandscape%2
    F&psig=AOvVaw3uwCQnQiZj1ErPwANc934D&ust
    =1551240797524767`;
export default class App extends Component {
  constructor (props) {
    super(props);
    console.log("running");
    
  }
  componentDidMount () {
    // SQLite.DEBUG(true);
    // SQLite.enablePromise(true);

<<<<<<< Updated upstream
    // SQLite.openDatabase({
    //     name: "TestDatabase",
    //     createFromLocation: "~testMySelf.db",
    // }).then((db) => {
    //     console.log("Database open!");
    // });
=======
  async componentDidMount() {
    // await AsyncStorage.removeItem('maxPage')
    // await AsyncStorage.removeItem('wallet')
    // console.log('wallet',await AsyncStorage.getItem(`wallet`))
    // await SpenseRepository.deleteAll();
    // console.log('spense',await SpenseRepository.getAll())
    // console.log('day',await SpenseRepository.getAllDay())
    await seed(true);
>>>>>>> Stashed changes
  }

  render() {
    return (
      <View>
        
      </View> 
      
    );
        
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

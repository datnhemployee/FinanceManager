
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SQLite from "react-native-sqlite-storage";
import Note from './src/view/screen/Note/Note';

const url = 
  `https://facebook.github.io/react-native/docs/assets/favicon.png`;
export default class App extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    //SQLite.DEBUG(true);
    //SQLite.enablePromise(true);

    // let connection = await SQLite.openDatabase({
    //    name: "TestDatabase",
    //    createFromLocation: "~testMySelf.db",
    //}).catch((err)=> {
    //  console.log(err);
    //});
    //console.log(connection)
  }

  render() {
    return (
      
      <View style={{flex: 1}}>
          <Note />
      </View>
    );
        
  }
}


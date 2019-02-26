
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import SQLite from "react-native-sqlite-storage";

export default class App extends Component {
  constructor (props) {
    super(props);
    console.log("running");
  }
  componentDidMount () {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
        name: "TestDatabase",
        createFromLocation: "~testMySelf.db",
    }).then((db) => {
        console.log("Database open!");
    });
  }

  render() {
    
    return (

      <View>
        <Text style={styles.container}>Welcome to React Native!</Text>
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

import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
// import FirstLetterIcon from './src/view/component/FirstLetterIcon/FirstLetterIcon';
// import Home from './src/view/screen/Home/Home';
import Spense from "./src/model/Spense";
import Datastore from "react-native-local-mongodb";
import TypeController from "./src/controller/TypeController";
import SpenseController from "./src/controller/SpenseController";

let TestDoc = new Datastore({
  filename: "Test",
  autoload: true,
  inMemoryOnly: false
});

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let test = await Spense.default();
    test.price = 400;
    let test_insert = await SpenseController.insert(test);
    // test._id = "KyotRH9AG8yhY9DN";
    // console.log('test',JSON.stringify(test));
    console.log("insert", test_insert);
    // test = await SpenseController.update({...test})
    // console.log('update',test);
    // console.log('delete',await SpenseController.delete(test));

    // console.log('insert test',JSON.stringify(await TestDoc.insertAsync({a: 300})));
    // console.log('get test',JSON.stringify(await TestDoc.findAsync({})));
    // await AsyncStorage.removeItem("change");
    // await SpenseController.deleteAll();
    let today = new Date();
    console.log(
      "get all spense",
      JSON.stringify(
        await SpenseController.getListByDate(
          today.getDate(),
          today.getMonth(),
          today.getFullYear()
        )
      )
    );
    console.log(
      "get all total",
      JSON.stringify(await SpenseController.getAllTotal())
    );
    console.log(
      "get all type",
      JSON.stringify(await SpenseController.getAllType())
    );

    // await TypeController.seed();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Home /> */}

        {/* <FirstLetterIcon 
          // firstLetter = {}
          /> */}
      </View>
    );
  }
}


import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
// import FirstLetterIcon from './src/view/component/FirstLetterIcon/FirstLetterIcon';
import Home from './src/view/screen/Home/Home';
import SpenseController from './src/controller/SpenseController';
import Spense from './src/model/Spense';
import ConstantValue from './src/constant/ConstantValue';
import Datastore from 'react-native-local-mongodb';

let TestDoc = new Datastore({
  filename: 'Test',
  autoload: true,
  inMemoryOnly: false,
})

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount () {

    let test = await Spense.default();
    test.price = 400;
    // test._id = "KyotRH9AG8yhY9DN";
    // console.log('test',JSON.stringify(test));
    // console.log('insert',await SpenseController.insert_spense(test));
    // test = await SpenseController.update({...test})
    // console.log('update',test);
    // console.log('delete',await SpenseController.delete(test));

    // console.log('insert test',JSON.stringify(await TestDoc.insertAsync({a: 300})));
    // console.log('get test',JSON.stringify(await TestDoc.findAsync({})));
    // await SpenseController.deleteAll();
    console.log('get all spense',JSON.stringify(await SpenseController.getListByDate(2,4,2019)));
    console.log('get all total',JSON.stringify(await SpenseController.getAllTotal()));
    console.log('get all type',JSON.stringify(await SpenseController.getAllType()));
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

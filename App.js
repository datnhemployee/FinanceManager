
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import FirstLetterIcon from './src/view/component/FirstLetterIcon/FirstLetterIcon';
import Home from './src/view/screen/Home/Home';
import SpenseController from './src/controller/SpenseController';


const url = 
  `https://facebook.github.io/react-native/docs/assets/favicon.png`;
export default class App extends Component {
  constructor (props) {
    super(props);
  }
  async componentDidMount () {

    let test = 
    SpenseController.insert_spense()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Home /> */}
        {/* <FirstLetterIcon 
          // firstLetter = {}
          /> */}
      </View>
    );
        
  }
}


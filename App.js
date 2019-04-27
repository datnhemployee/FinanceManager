
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Home from './src/view/screen/Home/Home';

const url = 
  `https://facebook.github.io/react-native/docs/assets/favicon.png`;
export default class App extends Component {
  constructor (props) {
    super(props);
  }
  async componentDidMount () {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Home />
      </View>
    );
        
  }
}



import React, { Component } from 'react';
import { 
    StyleSheet, 
    TextInput, 
    View,
} from 'react-native';

const defaultProps = {
    name: 'TextInput',
    sercureTextEntry: false,
    placeholder: 'Chạm để nhập...',
}

export default class CustomComponent extends Component {
  render() {
    let {
        name = defaultProps.name,
        sercureTextEntry = false,
        
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textInputUsername}
            secureTextEntry={sercureTextEntry}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInputUsername: {
        flex: 1,
        textAlign: 'left'
    },
    textInputPassword: {
        margin: 5,

    },
})


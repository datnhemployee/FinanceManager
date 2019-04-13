
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import render from './NavigationBar.design'

export default class extends Component {
    constructor (props) {
        super(props);
    }
   
    render() {
        let {
           index,
        } = this.props;
        return render({
            index,
        });
    }
}






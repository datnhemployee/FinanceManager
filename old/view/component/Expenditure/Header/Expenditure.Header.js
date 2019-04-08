
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import render from './Expenditure.Header.design'

export default class extends Component {
    constructor (props) {
        super(props);
    }
   
    render() {
        let {
            title,
            month,
            remainder,
        } = this.props;
        return render({title,month,remainder});
    }
}






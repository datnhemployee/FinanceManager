
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import Icon from '../../../../styles/Icon';
import render from './Expenditure.Footer.design'

export default class extends Component {
    constructor (props) {
        super(props);
    }
   
    render() {
        let {
           index,
        } = this.props;
        return render({index});
    }
}






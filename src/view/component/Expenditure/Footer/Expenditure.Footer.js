
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
            title,
            month,
            remainder,
        } = this.props;
        return render({title,month,remainder});
    }
}






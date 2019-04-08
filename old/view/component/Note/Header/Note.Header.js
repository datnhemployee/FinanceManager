
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main from './Note.Header.render'

export default class extends Component {
    constructor (props) {
        super(props);
    }
   
    render() {
        let {
            exspenses,
            date,
            confirmButton_Click,
            moreIconButton_Click,
            navigationDetail_Click,
            navigationBill_Click,
        } = this.props;
        return main({
            exspenses,
            date,
            confirmButton_Click,
            moreIconButton_Click,
            navigationDetail_Click,
            navigationBill_Click,
        });
    }
}






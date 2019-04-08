
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main, { navigationIDs } from './Note.Header.render'

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
   
    render() {
        let {
            navigated = navigationIDs.default,
            navigationDetail_Click = this.navigationDetail_Click,
            navigationBill_Click = this.navigationBill_Click,
        } = this.props;
        return main({
            navigated: navigated,
            navigationDetail_Click,
            navigationBill_Click,
        });
    }
}






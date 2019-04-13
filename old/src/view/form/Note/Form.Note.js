
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main, { navigationIDs } from './Note.Body.render'

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            navigated: navigationIDs.default,
        }
        this.navigationDetail_Click =  this.navigationDetail_Click.bind(this);
        this.navigationBill_Click = this.navigationBill_Click.bind(this);
    }
    navigationDetail_Click = () => {
        let temp = navigationIDs.detail;
        this.setState({navigated: temp})
    }

    navigationBill_Click = () => {
        let temp = navigationIDs.bill;
        this.setState({navigated: temp})
    }
   
    render() {
        let {
            navigationDetail_Click = this.navigationDetail_Click,
            navigationBill_Click = this.navigationBill_Click,
        } = this.props;
        return main({
            navigated: this.state.navigated,
            navigationDetail_Click,
            navigationBill_Click,
        });
    }
}






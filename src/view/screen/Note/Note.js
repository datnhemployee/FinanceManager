
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main from './Note.render'
import { navigationIDs } from '../../component/Note/Header/Note.Header.render';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            navigated: navigationIDs.default,
        }
        this.navigationDetail_Click =  this.navigationDetail_Click.bind(this);
        this.navigationBill_Click = this.navigationBill_Click.bind(this);
        this.onPageSelected = this.onPageSelected.bind(this);
    }
    navigationDetail_Click = () => {
        let temp = navigationIDs.detail;
        console.log("Bạn vừa chọm nè: "+ temp);
        this.setState({navigated: temp})
    }

    navigationBill_Click = () => {
        let temp = navigationIDs.bill;
        console.log("Bạn vừa chọm nè: "+ temp);
        this.setState({navigated: temp})
    }

    onPageSelected = (
        e
    )=> {
        let temp = e.nativeEvent.position + 1; 
        console.log("Bạn vừa chọm nè: "+ temp);
        this.setState({navigated: temp})
    }

    render() {
        let {
        } = this.props;
        return main({
            navigationDetail_Click: this.navigationDetail_Click,
            navigationBill_Click: this.navigationBill_Click,
            onPageSelected: this.onPageSelected,
            navigated: this.state.navigated,
        });
    }
}






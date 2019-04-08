
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main from './Note.Body.render'

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
   
    render() {
        let {
            onPageSelected,
        } = this.props;
        return main({
            onPageSelected:onPageSelected,
        });
    }
}






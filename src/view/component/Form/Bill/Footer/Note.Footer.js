
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import main, { navigationIDs } from './Note.Footer.render'

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
   
    render() {
        let {
            addPictureButton_Click,
            addNoteButton_Click,
            numberOfReminder,
            firstReminder,
        } = this.props;
        return main({
            numberOfReminder,
            firstReminder,
            addPictureButton_Click,
            addNoteButton_Click,
        });
    }
}






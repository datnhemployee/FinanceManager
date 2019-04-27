
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles, { substyles } from './Note.style';
import params from './Note.default';
import NoteLine from '../../component/Note/Line/Note.Line';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    
    dateLable () {
        return (
            <Text style={styles.dateLable}>
                {params.dateText}
            </Text>
        );
    }

    imageButton () {
        return (
            <TouchableOpacity 
                style={substyles.footer.imageButton}>
                {params.imageIcon}
            </TouchableOpacity>
        );
    }

    notificationButton () {
        return (
            <TouchableOpacity style={substyles.footer.notifyButton}>
                <Text style={substyles.footer.notifyText}>
                    {params.notificationText}            
                </Text>
            </TouchableOpacity>
        );
    }

    sendButton () {
        return (
            <TouchableOpacity 
                style={substyles.footer.sendButton}>
                {params.sendIcon}
            </TouchableOpacity>
        );
    }

    header () {
        return (
            <View style={styles.header}>
                {this.dateLable()}            
            </View>
        );
    }

    body () {
        let {
            navigation,
        } = this.props;
        return (
            <View style={styles.body}>
                <NoteLine 
                style={{flex: 1}}
                navigation = {navigation}
                />
            </View>
        );
    }

    footer () {
        return (
            <View style={styles.footer}>
                {this.imageButton()}
                {this.notificationButton()}
                {this.sendButton()}
            </View>
        );
    }

    render() {
        let {
        } = this.props;

        return (
            <View style={styles.container}>
                {this.header()}
                {this.body()}
                {this.footer()}
            </View>
        )
    }
}






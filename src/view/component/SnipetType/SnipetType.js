
import React, { Component } from 'react';
import { 
    View,
    Text,
} from 'react-native';
import styles, { substyles } from './SnipetType.style';
import params from './SnipetType.default';
import Typeface from '../../../styles/Font';
import FirstLetterIcon from '../FirstLetterIcon/FirstLetterIcon';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    getProps () {
        let {
            name = params.defaultName,
            total = params.defaultTotal,
        } = this.props;

        return {
            name,
            total,
        }
    }
    
    name () {
        let {
            name,
        } = this.getProps();
        let localStyles = substyles.header;
        return (
            <Text 
                style={localStyles.name}>
                {Typeface.toCase({
                    text: name,
                    type: Typeface.type.default,
                })}
            </Text>
        )
    }

    icon () {
        let {
            name,
        } = this.getProps();
        let localStyles = substyles.body;
        return (
            <FirstLetterIcon 
                style = {localStyles.icon}
                firstLetterIcon={name === params.defaultName?undefined:name[0]}/>
        )
    }

    total () {
        let {
            total,
        } = this.getProps();
        let localStyles = substyles.footer;
        return (
            <Text 
                style={localStyles.total}>
                {Typeface.toCase({
                    text: '' +total,
                    type: Typeface.type.default,
                })}
            </Text> 
        )
    }

    header () {
        return (
            <View style={styles.header}>
                {this.name()}
            </View>
        );
    }

    body () {
        return (
            <View style={styles.body}>
                {this.icon()}
            </View>
        );
    }

    footer () {
        return (
            <View style={styles.footer}>
                {this.total()}
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







import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles, { substyles } from './FirstLetterIcon.style';
import params from './FirstLetterIcon.default';
import Typeface, { Font,  } from '../../../styles/Font';
import Color from '../../../styles/Color';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    getProps () {
        let {
            firstLetter = '\+',
        } = this.props;
        return {
            firstLetter,
        }
    }
    
    header () {
        return (
            <View >
            </View>
        );
    }

    body () {
        let {
            firstLetter 
        } = this.getProps();
        return (
            <Text 
                style={[
                    styles.body,
                    firstLetter === '\+' ? {
                        ...Typeface.header[5],
                        borderStyle: 'dashed',
                        fontSize: 30,
                    }: {
                        fontFamily: Font.UVF.Verner,
                        fontSize: 30,
                    },
                ]}> 
                {Typeface.toCase({
                    text: firstLetter,
                    type: Typeface.type.button})}
            </Text>
        );
    }

    footer () {
        return (
            <View>
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






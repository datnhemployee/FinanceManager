
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
            color = Color.White,
            fontSize = 30,
            size = {width : 50, height : 50, borderRadius : 50},
        } = this.props;
        //console.log('FirstLetter',JSON.stringify(firstLetter));
        //console.log('color',JSON.stringify(color));
        return {
            firstLetter,
            color,
            fontSize,
            size,
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
            firstLetter,
            color,
            fontSize,
            size,
        } = this.getProps();

        return (
            <Text 
                style={[
                    styles.body,
                    size,
                    firstLetter === '\+' ? {
                        ...Typeface.header[5],
                        borderStyle: 'dashed',
                        fontSize: fontSize,
                        borderWidth: 2,
                    }: {
                        fontFamily: Font.UVF.Verner,
                        fontSize: fontSize,
                        color: Color.White,
                        backgroundColor: color,
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






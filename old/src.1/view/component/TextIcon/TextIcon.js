
import React, { Component } from './node_modules/react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles ,{ substyles } from './TextIcon.style';
import { Font } from '../../../styles/Font';
import Color from '../../../styles/Color';


export default class TextIcon extends Component {
    constructor (props) {
        super(props);
    }

    label () {
        let {
            label = 'Chưa phân loại',
        } = this.props;
        return (
            <Text style={substyles.header.label}>
                {label}
            </Text>
        )
    }

    spent () {
        let {
            spent = 0,
        } = this.props;
        return (
            <Text style={substyles.footer.spent}>
                {spent}
            </Text>
        )
    }

    text () {
        let {
            text = '+',
        } = this.props;
        return (
            <Text style={[
                substyles.body.text,
                text!==null?
                {}
                :{
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    fontFamily: Font.UVF.Verner,
                    fontSize: 20,
                }]}>
                {text}
            </Text>
        );
    }

    static get Size () {
        return {
            small: {
                width: 20,
                height: 20,
                borderRadius: 20,
            },
            intermediate: {
                width: 40,
                height: 40,
                borderRadius: 40,
            },
            large: {
                width: 60,
                height: 60,
                borderRadius: 60,
            },
        }
    }

    body () {
        let {
            size = TextIcon.Size.intermediate,
            color = Color.White,
        } = this.props;
        return (
            <View style={[
                styles.body,
                size,
                {
                    backgroundColor: color,
                }
                ]}>
                {this.text}
            </View>
        )
    }

    render() {
        let {
            size = TextIcon.Size.intermediate,
            color = Color.White,
        } = this.props;
        return (
            <View style={[
                styles.container,
                size,
                {
                    backgroundColor: color,
                }]}>
                {this.body}
            </View>
        );
    }
}

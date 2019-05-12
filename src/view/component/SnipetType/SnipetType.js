
import React, { Component } from 'react';
import { 
    View,
    Text,
    ToastAndroid,
} from 'react-native';
import styles, { substyles } from './SnipetType.style';
import params from './SnipetType.default';
import Typeface from '../../../styles/Font';
import FirstLetterIcon from '../FirstLetterIcon/FirstLetterIcon';
import TypeController from '../../../controller/TypeController';
import Type from '../../../model/Type';
import Codes from '../../../constant/Codes';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            type: Type.default(),
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

    async componentWillMount() {
        let {
            name,
        } = this.getProps();
        let result = await TypeController.getByName(name);
        if(result.code === Codes.Success){
            this.setState({type: result.content});
        } else {
            ToastAndroid.show(result.content,ToastAndroid.LONG);
        }
    }
    
    name () {
        
        let localStyles = substyles.header;
        return (
            <Text 
                style={localStyles.name}>
                {Typeface.toCase({
                    text: this.state.type.name,
                    type: Typeface.type.default,
                })}
            </Text>
        )
    }

    icon () {
        
        let localStyles = substyles.body;
        let firstLetter = '';
        if(this.state.type.name.length != 0)
            firstLetter = this.state.type.name[0];
        return (
            <FirstLetterIcon 
                style = {localStyles.icon}
                firstLetter={firstLetter}
                color={this.state.type.color}/>
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






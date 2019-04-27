
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import TextIcon from '../TextIcon/TextIcon';


export default class extends Component {
    constructor (props) {
        super(props);
    }

    list () {
        let {
            list = [
                {
                    spent: 0,
                }
            ]
        } = this.props;
        return (
            <Text style={subsStyle.list}>
                {list.map((val,indx)=> <TextIcon />)}
            </Text>
        );
    }

    date () {
        return (
            <Text style={subsStyle.date}>

            </Text>
        );
    }

    header () {
        return (
            <Text style={styles.header}>

            </Text>
        );
    }

    render() {
        return (
            <View>
                
            </View>
        );
    }
}


import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles, { substyles } from './Home.style';
import defaultProps from './Home.default';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    
    leftOver () {
        let {
            label,
        } = defaultProps.left;
        let {
            number = defaultProps.left,
        } = this.props;
        return (
            <View style={substyles.left.container}>
                <Text style={substyles.left.label}>
                    {label}
                </Text>
                <Text style={substyles.left.text}>
                    {number}
                </Text>
            </View>
        )
    }

    spent () {
        let {
            label,
        } = defaultProps.spent;
        let {
            number = defaultProps.spent,
        } = this.props;
        return (
            <View style={substyles.spent.container}>
                <Text style={substyles.spent.label}>
                    {label}
                </Text>
                <Text style={substyles.spent.text}>
                    {number}
                </Text>
            </View>
        )
    }

    addButton () {
        return defaultProps.addButton;
    }

    header () {
        return (
            <View style={styles.header}>
                
            </View>
        );
    }

    body () {
        return (
            <View style={styles.body}>
            </View>
        );
    }

    footer () {
        let {
            navigation,
        } = this.props;
        return (
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[
                        substyles.footer.button,
                    ]}
                    onPress = {()=>{navigation.navigate('Note')}}>
                    <Text >
                        Đến màn hình phụ
                    </Text>
                </TouchableOpacity>
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






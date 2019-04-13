
import React, { Component } from 'react';
import { 
    StyleSheet, 
    CheckBox,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles, {substyles} from './Note.Line.style';

export default class extends Component {
    constructor (props) {
        super(props);
        this.onTick = this.onTick.bind(this);
        this.state = {
            isTicked: false,
        }
    }

    onTick () {
        let temp = !this.state.isTicked;
        console.log('tick',this.state.isTicked);
        this.setState({isTicked:temp});
    }

    onLongPress () {
        let {
            navigation,
        } = this.props;
        console.log('navigate',JSON.stringify(navigation));
        navigation.navigate('Home');
    }


    text () {
        return (
            <TouchableOpacity 
                style={substyles.body.textContainer}
                onLongPress={(e) => {this.onLongPress()}}>
                <Text style={substyles.body.text}>
                    Mua Cá
                </Text>
            </TouchableOpacity>
        )
    }

    tickBox () {
        let {
            onValueChange,
        } = this.props;

        return (
            <TouchableOpacity 
                style={substyles.body.picker}
                onPress={(e) => {this.onTick()}}>
                <CheckBox 
                    disable={true}
                    value = {this.state.isTicked}
                    onValueChange={()=>{}}
                />
            </TouchableOpacity>
        );
    }

    header () {
        return (
            <View style={styles.header}>
                {this.tickBox()}
                {this.text()}
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
        return (
            <View style={styles.footer}>
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

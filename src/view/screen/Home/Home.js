
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles, { substyles } from './Home.style';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
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






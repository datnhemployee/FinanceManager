import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class AddMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneyValue: 0,
            note: ""
        }
    }

    moneyValueChange = (value) => {
        this.setState({ moneyValue: value });
    }

    noteChange = (text) => {
        this.setState({note : text});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_view}>
                    <Text style={styles.title_text}>Thêm khoản thu</Text>
                </View>
                <View style={{ flex: 10 }}>
                    <Text style={styles.content_text}>Số tiền thu :</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 5 }}
                        numberOfLines={1}
                        fontSize={18}
                        onChangeText={(value)=>{this.moneyValueChange(value)}}
                    />
                    <Text style={styles.content_text}>Ghi chú :</Text>
                    <TextInput 
                    style={{ borderWidth: 1, borderRadius: 5 }} 
                    multiline={true} numberOfLines={7} 
                    fontSize={18} 
                    onChangeText={(text)=>{this.noteChange(text)}}
                    />
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.button_text}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity style={styles.button} onPress={() => { this.props.closeAddMoney() }}>
                                <Text style={styles.button_text}>Hủy bỏ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 5,
        paddingLeft: 5
    },
    title_text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    title_view: {
        flex: 1,
        borderBottomWidth: 1,
        justifyContent: 'flex-end'
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: '#FF6600',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    content_text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
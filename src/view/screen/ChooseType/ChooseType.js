import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import params from './ChooseType.default';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Color from '../../../styles/Color';
import styles, { substyles } from './ChooseType.style';

class Item extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
                <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}>
                    <FirstLetterIcon firstLetter={this.props.name.slice(0, 1)} color={this.props.color} />
                    <View style={substyles.body.Info}>
                        <Text style={{ color: '#000000', fontSize: 20 }}> {this.props.name} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class ChooseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                name: `Chợ`,
                isIncome: false,
                color: Color.Gray,
            },
            {
                name: `Siêu thị`,
                isIncome: false,
                color: Color.Gray,
            },
            {
                name: `Sách vở`,
                isIncome: false,
                color: Color.Gray,
            },
            {
                name: `Thuế`,
                isIncome: false,
                color: Color.Gray,
            },
            {
                name: `Lương`,
                isIncome: true,
                color: Color.LightGreen,
            },
            {
                name: `Đòi nợ`,
                isIncome: true,
                color: Color.LightGreen,
            },
            {
                name: `Free Lance`,
                isIncome: true,
                color: Color.LightGreen,
            },
            {
                name: `Tiền phòng`,
                isIncome: true,
                color: Color.LightGreen,
            },
            ]
        }
    }

    backButtonClick() {

    }
    backButton() {
        return (
            <TouchableOpacity
                style={substyles.header.backButton}
                onPress={() => { this.backButtonClick() }}
            >
                {params.backButtonIcon}
            </TouchableOpacity>
        )
    }
    leftHeader() {
        return this.backButton();
    }
    title() {
        return (
            <Text style={substyles.header.title}>
                {params.title}
            </Text>
        )
    }
    midHeader() {
        return this.title();
    }
    cancelButton() {
        return (
            <View style={substyles.header.cancelButton}>
            </View>
        )
    }
    rightHeader() {
        return this.cancelButton();
    }
    header() {
        return (
            <View style={styles.header}>
                {this.leftHeader()}
                {this.midHeader()}
                {this.rightHeader()}
            </View>
        );
    }

    _renderIncomeItems(item) {
        if (item.isIncome) {
            return (
                <Item
                    name={item.name}
                    color={item.color}
                />
            )
        }
    }
    thu() {
        return (
            <View style={{ flex: 2 }}>
                <Text style={substyles.body.IncomeTitle}>Thu</Text>
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => this._renderIncomeItems(item)}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        )
    }
    _renderSpendItems(item) {
        if (!item.isIncome) {
            return (
                <Item
                    name={item.name}
                    color={item.color}
                />
            )
        }
    }
    chi() {
        return (
            <View style={{ flex: 2 }}>
                <Text style={substyles.body.SpendTitle}>Chi</Text>
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => this._renderSpendItems(item)}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        )
    }
    body() {
        return (
            <View style={styles.body}>
                {this.thu()}
                {this.chi()}
            </View>
        )
    }
    createNewClick() {
    }
    createNew() {
        return (
            <TouchableOpacity
                style={substyles.footer.saveButton}
                onPress={() => { this.createNewClick() }}
            >
                <Text style={substyles.footer.saveButtonText}>
                    {params.createNewText}
                </Text>
            </TouchableOpacity>

        );
    }
    footer() {
        return (
            <View style={styles.footer}>
                {this.createNew()}
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {this.header()}
                {this.body()}
                {this.footer()}
            </View>
        )
    }
}
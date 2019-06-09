import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Modal, ToastAndroid } from 'react-native';
import params from './ChooseType.default';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Color from '../../../styles/Color';
import styles, { substyles } from './ChooseType.style';
import TypeController from '../../../controller/TypeController';
import Navigation from '../../../constant/Navigation';
import PickType from '../PickType/PickType';
import Codes from '../../../constant/Codes';

class Item extends Component {
    render() {
        let {
            name,
            color,
            onPress,
            isPick = false,
        } = this.props;

        return (
            <View style={[
            //     isPick?
            // {backgroundColor: Color.LightGray}
            // :{backgroundColor: Color.White},
            { 
                // flex: 1, 
                height: 80,
                borderRadius: 10,
                backgroundColor: Color.White,
                margin: 5,
            }]}>
                <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}
                    onPress = {onPress}>
                    <FirstLetterIcon firstLetter={name[0]} color={color} />
                    <View style={substyles.body.Info}>
                        <Text style={{ color: Color.Black, fontSize: 20 }}> {name} </Text>
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
            listType: [],
            chosenType: `Rỗng`,
            navigation: Navigation.chooseType,
        }

        this.pickType_backButtonOnClick = this.pickType_backButtonOnClick.bind(this);
    }

    pickType_backButtonOnClick (result) {
        // console.log('back',JSON.stringify(result.code === Codes.Success))
        if(result.code === Codes.Success){
            this.setState({
                navigation: Navigation.chooseType,
                listType: [...this.state.listType,result.content],
            });
            ToastAndroid.show(`Thêm loại chi tiêu thành công.`,ToastAndroid.LONG);
        } else {
            ToastAndroid.show(result.content,ToastAndroid.LONG);
            this.setState({navigation: Navigation.chooseType});
        }
    }

    getProps () {
        let {
            isNavigatedToChooseType = false,
            backButtonOnClick = () => console.log(`Vừa nhấn chọn loại chi tiêu`),
            typeButtonOnClick = () => console.log(`Vừa nhấn quay về thêm chi tiêu`),
        } = this.props;

        return {
            isNavigatedToChooseType,
            backButtonOnClick,
            typeButtonOnClick,
        };
    }
    _chosenTypeOnPress (name) {
        console.log('Đang chọn: ',this.state.chosenType);
        let result = ``;
        if(this.state.chosenType != name){
            result = name;
        }
        this.setState({
            chosenType: result,
        });
    }

    async _backButtonOnClick() {
        let {
            backButtonOnClick,
        } = this.getProps();
        let typeFromDB = await TypeController.getByName(this.state.chosenType);

        if(typeFromDB.code === Codes.Success){
            backButtonOnClick(typeFromDB.content);
        } else {
            backButtonOnClick({
                name: ``,
                isIncome: false,
                color: Color.White,
            })
        }
    }

    backButton() {
        return (
            <TouchableOpacity
                style={substyles.header.backButton}
                onPress={async () => { await this._backButtonOnClick() }}
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
        let {
            typeButtonOnClick,
        } = this.getProps();
        if (item.isIncome) {
            return (
                <Item
                    key = {item.name + item.color}
                    name={item.name}
                    color={item.color}
                    // onPress = {() => {this._chosenTypeOnPress(item.name)}}
                    onPress = {() => {typeButtonOnClick({
                        name: item.name,
                        isIncome: item.isIncome,
                        color: item.color,
                    })}}
                    isPick = {item.name === this.state.chosenType}
                />
            )
        }
        return (<View key={item.name + item.color}/>)
    }
    income() {
        // console.log(`state income`,JSON.stringify(this.state))
        return (
            <View style={{ flex: 2 }}>
                <Text style={substyles.body.IncomeTitle}>Thu</Text>
                <ScrollView style={{flex: 1}}>
                    {this.state.listType.map((val)=> this._renderIncomeItems(val))}
                </ScrollView>
            </View>
        )
    }
    _renderSpendItems(item) {
        let {
            typeButtonOnClick,
        } = this.getProps();
        if (!item.isIncome) {
            return (
                <Item
                    key = {item.name + item.color}
                    name={item.name}
                    color={item.color}
                    // onPress = {() => {this._chosenTypeOnPress(item.name)}}
                    onPress = {() => {typeButtonOnClick({
                        name: item.name,
                        isIncome: item.isIncome,
                        color: item.color,
                    })}}
                    isPick = {item.name === this.state.chosenType}
                />
            )
        } 
        return (<View key={item.name + item.color}/>)
    }
    expenditure() {
        // console.log(`state expen`,JSON.stringify(this.state))
        return (
            <View style={{ flex: 2 }}>
                <Text style={substyles.body.SpendTitle}>Chi</Text>
                <ScrollView style={{flex: 1}}>
                    {this.state.listType.map((val,index)=> (
                        <View style={{flex: 1}} key={`SpenseItem` + index}>
                            {this._renderSpendItems(val)}
                        </View>))}
                </ScrollView>
            </View>
        )
    }
    body() {
        return (
            <View style={styles.body}>
                {this.income()}
                {this.expenditure()}
            </View>
        )
    }
    createNewClick() {
        this.setState({navigation: Navigation.pickType});
        this.refPickType.refresh();
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

    async componentDidMount() {

        let typeFromDB = await TypeController.getAll();
        this.setState({listType: typeFromDB.content});
    }



    pickType () {
        return (<PickType
                    isNavigateToPickType = {this.state.navigation === Navigation.pickType} 
                    backButtonOnClick = {this.pickType_backButtonOnClick}
                    ref = {(refPickType) => {this.refPickType = refPickType}}
                />)
    }

    render() {
        let {
            isNavigatedToChooseType,
        } = this.getProps();
        return (
            <Modal
                transparent={false}
                visible={isNavigatedToChooseType}
                animationType={"slide"}>
                <View style={styles.container}>
                    {this.header()}
                    {this.body()}
                    {this.footer()}
                    {this.pickType()}
                </View>
            </Modal>

        )
    }
}
import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import styles, { substyles } from './PickType.style';
import params from './PickType.default';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControlTab from "react-native-segmented-control-tab";
import ColorPalette from 'react-native-color-palette';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import TypeController from '../../../controller/TypeController'

export default class PickType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            tabColor: 'green',
            selectedColor: '#AAAAAA',
            nameInputValue: ''
        }
    }

    handleIndexChange = (index) => {
        if (index === 0) {
            this.setState({
                tabColor: 'green',
                selectedIndex: index
            });
        }
        else {
            this.setState({
                tabColor: 'red',
                selectedIndex: index
            });
        }
    };

    async saveButtonClick(){
        await TypeController.insert({
            name: this.state.nameInputValue,
            isIncome: this.state.tabColor === 'green',
            color: this.state.selectedColor,
        })
    }
    saveButton() {
        return (
            <TouchableOpacity
                style={substyles.footer.saveButton}
                onPress={()=>{this.saveButtonClick()}}
            >
                <Text style={substyles.footer.saveButtonText}>
                    {params.saveButtonText}
                </Text>
            </TouchableOpacity>

        );
    }
    backButtonClick(){
        
    }
    backButton() {
        return (
            <TouchableOpacity
                style={substyles.header.backButton}
                onPress={()=>{this.backButtonClick()}}
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
    nameInput() {
        return (
            <View>
                <TextInput
                    keyboardType={'default'}
                    style={substyles.body.nameInput}
                    value={this.state.nameInputValue}
                    placeholder={params.placeholder.inputName}
                    onChangeText={(value)=>{this.setState({nameInputValue : value})}}
                ></TextInput>
            </View>
        )
    }
    tradeTypePick() {
        return (
            <View>
                <SegmentedControlTab
                    values={["Thu", "Chi"]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    tabStyle={{ borderColor: this.state.tabColor }}
                    tabTextStyle={{ color: this.state.tabColor }}
                    activeTabStyle={{ backgroundColor: this.state.tabColor, borderColor: this.state.tabColor }}
                />
            </View>
        )
    }
    colorPicker() {
        return (
            <View>
                <ColorPalette
                    value={this.state.selectedColor}
                    colors={['#AAAAAA', '#FFFFF0', '#CC0000', '#EE0000', '#228B22', '#7FFF00', '#00FF66', '#FFD700', '#FFFF33', '#436EEE', '#7A67EE', '#00BFFF', '#FF8C00', '#FF7256', '#CD4F39', '#CD00CD', '#FF6EB4', '#FFB5C5']}
                    title={""}
                    icon={<MCIcon name={'check-circle-outline'} size={25} color={'black'} />}
                    onChange={(value) => {this.setState({selectedColor : value})}}
                />
            </View>
        )
    }
    firstLetterIcon() {
        if(this.state.nameInputValue === '')
        {
            return(
                <View>
                </View>
            )
        }
        else{
            let string = this.state.nameInputValue;
            return (
                <View style={{height : 200, alignItems : 'center', justifyContent : 'center'}}>
                    <FirstLetterIcon
                        firstLetter = {string.slice(0,1)}
                        color = {this.state.selectedColor}
                        fontSize = {90}
                        size = {{width : 150, height : 150, borderRadius : 150}}
                    />
                </View>
            )
        }
    }
    body() {
        return (
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}>
                {this.nameInput()}
                {this.tradeTypePick()}
                {this.colorPicker()}
                {this.firstLetterIcon()}
            </ScrollView>
        );
    }
    footer() {
        return (
            <View style={styles.footer}>
                {this.saveButton()}
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='padding'>
                    {this.header()}
                    {this.body()}
                    {this.footer()}
                </KeyboardAvoidingView>
            </View>
        )
    }
}
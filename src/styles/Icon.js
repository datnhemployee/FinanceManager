import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Color from './Color';
 
const StandardSize = {
    smallest: 10,
    small: 20,
    intermediate: 30,
    large: 40,
    huge: 50,
}

const Size = {
    default: StandardSize.intermediate,
    ...StandardSize,
}
const NameList = {
    default: 'areachart',
    user: 'user-circle-o',
    filter: 'filter',
    left: 'caretleft',
    right: 'caretright',
    home_untapped: 'home-variant-outline',
    home_tapped: 'home-variant',
    total_untapped: 'pie-chart-outlined',
    total_tapped: 'pie-chart',
    expenditure_untapped: 'wallet',
    expenditure_tapped: 'wallet',
    debt_untapped: 'creditcard',
    debt_tapped: 'money-check-alt',
    add: 'pluscircle',
}

export default {
    User: (
        size = Size.intermediate,
        color = Color.White,
        ) => 
        <FontAwesome name={NameList.user} size={size} color={color}/>,
    Left: (
        size = Size.intermediate,
        color = Color.White,
        ) => 
        <AntDesign name={NameList.left} size={size} color={color}/>,
    Right: (
        size = Size.intermediate,
        color = Color.White,
        ) => 
        <AntDesign name={NameList.right} size={size} color={color}/>,
    HomeTapped: (
        size = Size.intermediate,
        color = Color.Black,
        ) => 
        <MaterialCommunityIcons name={NameList.home_tapped} size={size} color={color}/>,
    HomeUntapped: (
        size = Size.intermediate,
        color = Color.Gray,
        ) => 
        <MaterialCommunityIcons name={NameList.home_untapped} size={size} color={color}/>,
    TotalTapped: (
        size = Size.intermediate,
        color = Color.Black,
        ) => 
        <MaterialIcons name={NameList.total_tapped} size={size} color={color}/>,
    TotalUntapped: (
        size = Size.intermediate,
        color = Color.Gray,
        ) => 
        <MaterialIcons name={NameList.total_untapped} size={size} color={color}/>,
    ExpenditureTapped: (
        size = Size.intermediate,
        color = Color.Black,
        ) => 
        <Entypo name={NameList.expenditure_tapped} size={size} color={color}/>,
    ExpenditureUntapped: (
        size = Size.intermediate,
        color = Color.Gray,
        ) => 
        <AntDesign name={NameList.expenditure_untapped} size={size} color={color}/>,
    DebtTapped: (
        size = Size.intermediate,
        color = Color.Black,
        ) => 
        <FontAwesome5 name={NameList.debt_tapped} size={size} color={color}/>,
    DebtUntapped: (
        size = Size.intermediate,
        color = Color.Gray,
        ) => 
        <AntDesign name={NameList.debt_untapped} size={size} color={color}/>,
    Add: (
        size = Size.intermediate,
        color = Color.Green,
        ) => 
        <AntDesign name={NameList.add} size={size} color={color}/>,
}

export {
    Size,
}
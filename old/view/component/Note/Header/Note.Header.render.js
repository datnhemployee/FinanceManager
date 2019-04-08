import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Render from './Note.Header.key'
import Styles, { Substyles } from './Note.Header.style'
import Props from './Note.Header.props'

// author Dat
const TradingOff = {}

TradingOff[Render.Exspense] = ({
    exspenseValue = Props.exspenseValue,
}={}) => {
    return (
        <View style={Styles[Render.Exspense]}>
            <Text style={Substyles[Render.Exspense].ValueText}>
                {exspenseValue}
            </Text>
            <Text style={Substyles[Render.Exspense].Text}>
                {Props.exspenseText}
            </Text>
        </View>
    )
}

TradingOff[Render.ConfirmBar] = ({
    confirmButton_Click = Props.confirmButton_Click,
    moreIconButton_Click = Props.moreIconButton_Click,
}={}) => {
    return (
        <View style={Styles[Render.ConfirmBar]}>
            <View style={Substyles[Render.ConfirmBar].confirmButtonContainer}>
                <View style={Substyles[Render.ConfirmBar].leftGap}></View>
                <TouchableOpacity 
                    style={Substyles[Render.ConfirmBar].confirmButton}
                    onPress = {()=>confirmButton_Click()}>
                <Text style={Substyles[Render.ConfirmBar].confirmButtonText}>
                    {Props.confirmButtonText}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={Substyles[Render.ConfirmBar].iconMoreContainer}>
                <TouchableOpacity 
                    style={Substyles[Render.ConfirmBar].iconMoreButton}
                    onPress = {()=>moreIconButton_Click()}>
                    <View 
                        style={Substyles[Render.ConfirmBar].iconMore}>
                        {Props.iconMore}
                    </View>
                </TouchableOpacity>
                <View style={Substyles[Render.ConfirmBar].rightGap}></View>
            </View>
        </View>
    )
}

TradingOff[Render.DateLabel] = ({
    date = Props.date,
}={}) => {
    return (
        <View style={Styles[Render.DateLabel]}>
            <Text style={Substyles[Render.DateLabel].confirmButtonText}>
                {date}
            </Text>
        </View>
    )
}

TradingOff[Render.NavigationBar] = ({
    navigationDetail_Click= Props.navigationDetail_Click,
    navigationBill_Click= Props.navigationBill_Click,
}={}) => {
    return (
        <View style={Styles[Render.NavigationBar]}>
            <View style={Substyles[Render.NavigationBar].NavigationContainer}>
                <TouchableOpacity 
                    style={Substyles[Render.NavigationBar].navigationDetail}
                    onPress = {()=>navigationDetail_Click()}>
                    <Text style={Substyles[Render.NavigationBar].navigationDetailText}>
                        {Props.navigationDetailText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={Substyles[Render.NavigationBar].navigationBill}
                    onPress = {()=>navigationBill_Click()}>
                    <Text style={Substyles[Render.NavigationBar].navigationBillText}>
                        {Props.navigationBillText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

TradingOff[Render.Header] = ({
    exspense,
}={}) => {
    return (
        <View style={Styles[Render.Header]}>
            {TradingOff[Render.Exspense]({exspense:exspense})}
        </View>
    )
}

TradingOff[Render.Body] = ({
    date,
}={}) => {
    return (
        <View style={Styles[Render.Body]}>
            {TradingOff[Render.ConfirmBar]()}            
            {TradingOff[Render.DateLabel]({date:date})}            
        </View>
    )
}

TradingOff[Render.Footer] = ({
    navigationDetail_Click,
    navigationBill_Click,
}={}) => {
    return (
        <View style={Styles[Render.Footer]}>
            {TradingOff[Render.NavigationBar]({
                navigationDetail_Click: navigationDetail_Click,
                navigationBill_Click: navigationBill_Click,
            })}            
        </View>
    )
}

export default ({
    exspenses,
    date,
    confirmButton_Click,
    moreIconButton_Click,
    navigationDetail_Click,
    navigationBill_Click,
} = {}) => {
    return (
        <View style={Styles.Container}>
            {TradingOff[Render.Header]({exspenses})}
            {TradingOff[Render.Body]({
                date,
                confirmButton_Click,
                moreIconButton_Click,
            })}
            {TradingOff[Render.Footer]({
                navigationDetail_Click,
                navigationBill_Click,
            })}
        </View>
    );
}


import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Render from './Note.Header.key'
import Styles, { Substyles } from './Note.Header.style'
import Props from './Note.Header.props'
import Typeface from '../../../../styles/Font';
import Color from '../../../../styles/Color';

// author Dat


const navigationIDs = {
    detail: 1,
    bill: 2,
    default: 1,
}

const navigationStyle = {
    tapped : {
        borderBottomColor: Color.White,
    },
    untapped: {
        borderBottomColor: Color.White,
    },
}

const navigationTextStyle = {
    tapped : {
        color: Color.DarkGreen,
    },
    untapped: {
        color: Color.Gray,
    },
}

const transformNavigation = ({
    id = navigationIDs.default,
    navigated = navigationIDs.default,
} = {}) => {
    if( !Object.keys(navigationIDs).findIndex((val)=>val===id) ||
        !Object.keys(navigationIDs).findIndex((val)=>val===navigated) ||
        id != navigated)
        return navigationStyle.untapped;
    return navigationStyle.tapped;
}

const transformNavigationText = ({
    id = navigationIDs.default,
    navigated = navigationIDs.default,
} = {}) => {
    if( !Object.keys(navigationIDs).findIndex((val)=>val===id) ||
    !Object.keys(navigationIDs).findIndex((val)=>val===navigated) ||
    id != navigated)
    return navigationTextStyle.untapped;
return navigationTextStyle.tapped;
}

const TradingOff = {}

TradingOff[Render.NavigationBar] = ({
    navigated = navigationIDs.default,
    navigationDetail_Click= Props.navigationDetail_Click,
    navigationBill_Click= Props.navigationBill_Click,
}={}) => {
        return (
        <View style={Styles[Render.NavigationBar]}>
            <View style={Substyles[Render.NavigationBar].NavigationContainer}>
                <TouchableOpacity 
                    style={[
                        Substyles[Render.NavigationBar].navigationDetail,
                        transformNavigation({
                            navigated: navigated,
                            id: navigationIDs.detail,
                        }),
                    ]}
                    onPress = {()=>navigationDetail_Click()}>
                    <Text style={[
                            Substyles[Render.NavigationBar].navigationDetailText,
                            transformNavigationText({
                                navigated: navigated,
                                id: navigationIDs.detail,
                            }),
                        ]}>
                        {Typeface.toCase({
                            text: Props.navigationDetailText,
                            type: Typeface.type.default,
                        })
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        Substyles[Render.NavigationBar].navigationBill,
                        transformNavigation({
                            navigated: navigated,
                            id: navigationIDs.bill,
                        }),
                    ]}
                    onPress = {()=>navigationBill_Click()}>
                    <Text style={[
                            Substyles[Render.NavigationBar].navigationBillText,
                            transformNavigationText({
                                navigated: navigated,
                                id: navigationIDs.bill,
                            }),
                        ]}>
                        {Typeface.toCase({
                            text: Props.navigationBillText,
                            type: Typeface.type.default,
                        })}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

TradingOff[Render.Header] = ({
}={}) => {
    return (
        <View >
        </View>
    )
}

TradingOff[Render.Body] = ({
}={}) => {
    return (
        <View >
        </View>
    )
}

TradingOff[Render.Footer] = ({
    navigated,
    navigationDetail_Click,
    navigationBill_Click,
}={}) => {
    return (
        <View style={Styles[Render.Footer]}>
            {TradingOff[Render.NavigationBar]({
                navigated,
                navigationDetail_Click,
                navigationBill_Click,
            })}            
        </View>
    )
}

export default ({
    navigated,
    navigationDetail_Click,
    navigationBill_Click,
} = {}) => {
    return (
        <View style={Styles.Container}>
            {TradingOff[Render.Header]({})}
            {TradingOff[Render.Body]({})}
            {TradingOff[Render.Footer]({
                navigated,
                navigationDetail_Click,
                navigationBill_Click,
            })}
        </View>
    );
}


export {
    navigationIDs,
    navigationStyle,
    navigationTextStyle,
}


import React, { Component } from 'react';
import { 
    View,
    Text,
    ViewPagerAndroid,
} from 'react-native';
import Render from './Note.Body.key'
import Styles, { Substyles } from './Note.Body.style'
import Props from './Note.Body.props'
import Typeface from '../../../../styles/Font';
import Color from '../../../../styles/Color';

// author Dat

const TradingOff = {}

TradingOff[Render.Pager] = ({
    onPageSelected = Props.onPageSelected,
}={}) => {
    let _viewPager = null;
    let result = {
        Component: (
            <ViewPagerAndroid 
                style={Styles[Render.Pager]}
                initialPage={Props.defaultNavigate}
                onPageSelected={onPageSelected}
                ref={(viewPager)=>{_viewPager = viewPager}}>

                <View style={Substyles[Render.Pager].DetailForm}
                    key={Props.detailNavigate}>
                    <Text>detail</Text>
                </View>

                <View style={Substyles[Render.Pager].BillForm}
                    key={Props.billNavigate}>
                    <Text>bill</Text>
                </View>
            </ViewPagerAndroid>
        ),
        ref: {
            _viewPager,
        }
    }
    return result;
}

TradingOff[Render.DateText] = ({
}={}) => {
        return (
        <Text style={Styles[Render.DateText]}>
            { Typeface.toCase({
                text: Props.dateText,
                type: Typeface.type.overline,
            })}
        </Text>
    )
}

TradingOff[Render.Header] = ({
}={}) => {
    return (
        <View style={Styles[Render.Header]}>
        </View>
    )
}

TradingOff[Render.Body] = ({
    onPageSelected,
}={}) => {
    return (
        <View style={Styles[Render.Body]}>
            {TradingOff[Render.DateText]({})}
            {TradingOff[Render.Pager]({
                onPageSelected:onPageSelected
            }).Component}
        </View>
    )
}

TradingOff[Render.Footer] = ({
}={}) => {
    return (
        <View style={Styles[Render.Footer]}>
        </View>
    )
}

export default ({
    onPageSelected,
} = {}) => {
    return (
        <View style={Styles.Container}>
            {TradingOff[Render.Header]({})}
            {TradingOff[Render.Body]({
                onPageSelected:onPageSelected,
            })}
            {TradingOff[Render.Footer]({
            })}
        </View>
    );
}

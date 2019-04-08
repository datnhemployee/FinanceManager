import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Render from './Note.key'
import Styles, { Substyles } from './Note.style'
import Props from './Note.props'
import NoteBody from '../../component/Note/Body/Note.Body'
import NoteHeader from '../../component/Note/Header/Note.Header'
import NoteFooter from '../../component/Note/Footer/Note.Footer'

// author Dat

const TradingOff = {}

TradingOff[Render.Header] = ({
    navigationDetail_Click,
    navigationBill_Click,
}={}) => {
    return (
        <View style={Styles[Render.Header]}>
            <NoteHeader 
                navigationDetail_Click={navigationDetail_Click}
                navigationBill_Click={navigationBill_Click}
            />
        </View>
    )
}

TradingOff[Render.Body] = ({
    onPageSelected,
}={}) => {
    return (
        <View style={Styles[Render.Body]}>
            <NoteBody 
                onPageSelected = {onPageSelected}
            />
        </View>
    )
}

TradingOff[Render.Footer] = ({
}={}) => {
    return (
        <View style={Styles[Render.Footer]}>
            <NoteFooter />
        </View>
    )
}

export default ({
    navigationDetail_Click,
    navigationBill_Click,
    onPageSelected,
} = {}) => {
    return (
        <View style={Styles.Container}>
            {TradingOff[Render.Header]({
                navigationDetail_Click,
                navigationBill_Click,
            })}          
            {TradingOff[Render.Body]({
                onPageSelected,
            })}          
            {TradingOff[Render.Footer]({})}          
        </View>
    );
}

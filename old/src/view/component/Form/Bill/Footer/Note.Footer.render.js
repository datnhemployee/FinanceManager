import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Render from './Note.Footer.key'
import Styles, { Substyles } from './Note.Footer.style'
import Props from './Note.Footer.props'
import Typeface from '../../../../styles/Font';
import Color from '../../../../styles/Color';

// author Dat
const TradingOff = {}

TradingOff[Render.AddPictureButton] = ({
    addPictureButton_Click = Props.addPictureButton_Click,
}={}) => {
        return (
        <TouchableOpacity 
            style={[
                Styles[Render.AddPictureButton],
            ]}
            onPress = {()=>addPictureButton_Click()}>
            {Props.pictureIcon}
        </TouchableOpacity>
    )
}

TradingOff[Render.NavigationButton] = ({
    firstReminder = Props.firstReminder,
    numberOfReminder = Props.numberOfReminder,
    navigateButton_Click = Props.navigateButton_Click,
}={}) => {
        return (
        <View style={Styles[Render.NavigationButton]}>
            <TouchableOpacity 
                style={[
                    Substyles[Render.NavigationButton].button,
                ]}
                onPress = {()=>navigateButton_Click()}>
                <Text style={[
                        Substyles[Render.NavigationButton].text,
                    ]}>
                    {Typeface.toCase({
                        text: firstReminder,
                        type: Typeface.type.default,
                    })}
                </Text>
                <Text style={[
                        Substyles[Render.NavigationButton].number,
                        numberOfReminder>0 ? 
                            {
                                color:Color.DarkGreen,
                                backgroundColor:Color.DarkGreen,
                            }
                            :{
                                color:Color.White,
                                backgroundColor:Color.White,
                            }
                    ]}>
                    {Typeface.toCase({
                        text: `${numberOfReminder}`,
                        type: Typeface.type.default,
                    })}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

TradingOff[Render.AddNoteButton] = ({
    addNoteButton_Click = Props.addNoteButton_Click,
}={}) => {
        return (
        <View style={Styles[Render.AddNoteButton]}>
            <TouchableOpacity 
                style={[
                    Substyles[Render.AddNoteButton].icon,
                ]}
                onPress = {()=>addNoteButton_Click()}>
                {Props.sendIcon}
            </TouchableOpacity>
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
    firstReminder,
    numberOfReminder,
    addPictureButton_Click,
    addNoteButton_Click,
    navigateButton_Click,
}={}) => {
    return (
        <View style={Styles[Render.Footer]}>
            {TradingOff[Render.AddPictureButton]({
            })}   
            {TradingOff[Render.NavigationButton]({
                firstReminder,
                numberOfReminder,
                navigateButton_Click,
            })}
            {TradingOff[Render.AddNoteButton]({
                addPictureButton_Click,
                addNoteButton_Click,
            })}         
        </View>
    )
}

export default ({
    firstReminder,
    numberOfReminder,
    addPictureButton_Click,
    addNoteButton_Click,
    navigateButton_Click,
} = {}) => {
    return (
        <View style={Styles.Container}>
            {TradingOff[Render.Header]({})}
            {TradingOff[Render.Body]({})}
            {TradingOff[Render.Footer]({
                firstReminder,
                numberOfReminder,
                addPictureButton_Click,
                addNoteButton_Click,
                navigateButton_Click,
            })}
        </View>
    );
}

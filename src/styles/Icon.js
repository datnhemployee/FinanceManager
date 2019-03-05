import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
}

export {
    Size,
}
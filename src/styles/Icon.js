import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
 
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
    left: 'left',
    right: 'right',
}

export default {
    User: (size = Size.intermediate) => 
        <FontAwesome name={NameList.user} size={size}/>,
    Left: (size = Size.intermediate) => 
        <FontAwesome name={NameList.user} size={size}/>,
    Right: (size = Size.intermediate) => 
        <FontAwesome name={NameList.user} size={size}/>,
}

export {
    Size,
}
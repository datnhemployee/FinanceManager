import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Color from './Color';
 
const StandardSize = {
    smallest: 10,
    small: 20,
    intermediate: 25,
    large: 40,
    huge: 50,
}

const Size = {
    default: StandardSize.small,
    ...StandardSize,
}
const NameList = {
    default: 'areachart',

    user: 'user-circle-o',

    filter: 'filter',

    left: 'chevron-left',
    right: 'caretright',

    home_untapped: 'home',
    home_tapped: 'home',

    total_untapped: 'pie-chart-outlined',
    total_tapped: 'pie-chart',

    expenditure_untapped: 'wallet',
    expenditure_tapped: 'wallet',

    debt_untapped: 'creditcard',
    debt_tapped: 'money-check-alt',

    add: 'pluscircle',

    notebook_tapped: 'notebook',
    notebook_tapped: 'notebook',

    note_tapped: 'clone',
    note_untapped: 'clone',

    picture: 'picture-o',

    send: 'send-o',
}

const untapColor = Color.Navigation.untapped;

export default {
    User: ({
        size = Size.default,
        color = Color.Gray,
        }={}) => 
        <FontAwesome name={NameList.user} size={size} color={color}/>,
    Left: ({
        size = Size.default,
        color = Color.Gray,
        }={}) => 
        <AntDesign name={NameList.left} size={size} color={color}/>,
    Right: ({
        size = Size.default,
        color = Color.Gray,
        }={}) => 
        <AntDesign name={NameList.right} size={size} color={color}/>,
    // Home: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //         <AntDesign name={NameList.home_tapped} size={size} color={tapColor}/>
    //         :<AntDesign name={NameList.home_untapped} size={size} color={untapColor}/>,
    // Total: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //         <MaterialIcons name={NameList.total_tapped} size={size} color={tapColor}/>
    //         :<MaterialIcons name={NameList.total_untapped} size={size} color={untapColor}/>,
    // Expenditure: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //         <Entypo name={NameList.expenditure_tapped} size={size} color={tapColor}/>
    //         :<AntDesign name={NameList.expenditure_untapped} size={size} color={untapColor}/>,
    // Debt: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //     <FontAwesome5 name={NameList.debt_tapped} size={size} color={tapColor}/>
    //     :<AntDesign name={NameList.debt_untapped} size={size} color={untapColor}/>,
    // Add: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //     <AntDesign name={NameList.add} size={size} color={tapColor}/>
    //     :<AntDesign name={NameList.add} size={size} color={untapColor}/>,
    Note: ({
        isTapped = false,
        size = Size.default,
        tapColor = Color.Black,
        }={}) => isTapped ?
            <FontAwesome name={NameList.note_tapped} size={size} color={tapColor}/>
            :<FontAwesome name={NameList.note_untapped} size={size} color={untapColor}/>,
    // Notebook: ({
    //     isTapped = false,
    //     size = Size.default,
    //     tapColor = Color.Black,
    //     }={}) => isTapped ?
    //         <SimpleLineIcons name={NameList.notebook_tapped} size={size} color={tapColor}/>
    //         :<SimpleLineIcons name={NameList.notebook_untapped} size={size} color={untapColor}/>,
    Left: ({
        size = Size.default,
        color = Color.Black,
        }={}) => 
            <Entypo name={NameList.left} size={size} color={color}/>,
    Picture: ({
        size = Size.default,
        color = Color.Black,
        }={}) => 
            <FontAwesome name={NameList.picture} size={size} color={color}/>,
    Send: ({
        size = Size.default,
        color = Color.Black,
        }={}) => 
            <FontAwesome name={NameList.send} size={size} color={color}/>,        
            
}

export {
    Size,
}
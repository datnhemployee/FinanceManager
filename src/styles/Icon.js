import React from 'react';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

const IconSize = {
    Smallest: 10,
    Small: 20,
    Intermediate: 30,
    Large: 40,
    Huge: 50,
}

const UserIcon = (size=IconSize.Intermediate) => {
    return (<FontAwesome name={'user-circle-o'} size={size}/>)}; 
const DefaultIcon = (size=IconSize.Intermediate) => {
    return (<AntDesign name={'areachart'} size={size}/>)};
const FilterIcon = (size=IconSize.Intermediate) => {
    return (<AntDesign name={'filter'} size={size}/>)};

const isValid = async (url) => {
    let res = await axios.get(url);
    console.log(res);
    return true;
    }

export default {
    DefaultIcon,
    UserIcon,
    FilterIcon,
    IconSize,
    isValid,
};


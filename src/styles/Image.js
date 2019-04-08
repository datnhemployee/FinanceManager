import React, {Component} from 'react';
import {Image} from 'react-native';

const StandardSize = {
    smallest: 10,
    small: 20,
    intermediate: 30,
    large: 40,
    huge: 50,
}

export const ImageSize = {
    smallest: {
        width: StandardSize.smallest, 
        height: StandardSize.smallest,
    },
    small: {
        width: StandardSize.small, 
        height: StandardSize.small,
    },
    intermediate: {
        width: StandardSize.intermediate, 
        height: StandardSize.intermediate,
    },
    large: {
        width: StandardSize.large, 
        height: StandardSize.large,
    },
    huge: {
        width: StandardSize.huge, 
        height: StandardSize.huge,
    },
}

export default {
    Shopping: ({
        size = ImageSize.intermediate,
    }={}) => {
        return <Image 
            style = {size}
            source={require('../img/Shopping.png')}
            />
    },
    Spenses: ({
        size = ImageSize.intermediate,
    }={}) => {
        return <Image 
            style = {size}
            source={require('../img/Spenses.png')}
            />
    },
    Default: ({
        size = ImageSize.intermediate,
    }={}) => {
        return <Image 
            style = {size}
            source={require('../img/Default.png')}
            />
    }
}

import React, { Component } from 'react';
import { 
    View,
    Text,
} from 'react-native';
import Name from './Expenditure.Body.design.interface'
import styles from './Expenditure.Body.style'
import Icon, { Size } from '../../../../styles/Icon';
import Card from '../../Card/Card';

const props = {
    
}

/**
 * @description The `List_V1` is used at present
 * @tag `author` just be changed by the author
 */
const List_V1 = {
    version: 0.1,
    colaborators: [
        'Dat',
    ],
    date: new Date(2019,3,3),
}

List_V1[Name.render] = ({
    }={}) => {
    return (
        <View style={styles.container}>
            <Card />
        </View>
    )
}

// **Note: To release new version of the functions 
// Adding new version of the functions shall satisfy the rules below:
//  + Same name: when the version of the new one is from the (version + 0.1) to (version + 0.9)
//  + name[V + 1]: when the version of the new one is more than version + 1) 


/**
 * @description The `FunctionNameList` is used at present
 * @tag `Changable`
 */
const List = {
    ...{
        render: List_V1[Name.render].bind(List_V1),
    },
    //  the next release version should be added here ...
    ...{
        // **Note: Update new name of the functions here until a new version releases.
    }
};

// console.log('List',JSON.stringify(List[Name.renderTitle])) undefined
// console.log('List_f',JSON.stringify(List[Name.renderTitle]())) function

/**
 * @function render 
 */
export default List.render;
export {
    Name,
    List,
};



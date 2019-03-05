import React, { Component } from 'react';
import { 
    Picker,
    View,
    Text,
} from 'react-native';
import Header from '../../component/Expenditure/Header/Expenditure.Header'
import Name from './Expenditure.design.interface';
import styles from './Expenditure.style';

/**
 * @description The `FunctionNameList` is used at present
 * @tag `Unchangable`
 */
const List_V1 = {
    version: 0.1,
    colaborators: [
        'Dat',
    ],
    date: new Date(2019,3,3),
    [Name.renderHeader]: ({
        title,
        month,
        remainder,
    }={})=> {
        return (
            <View style={styles.header}>
                <Header 
                    title={title}
                    month={month}
                    remainder={remainder}
                />
            </View>
        )
    },

    [Name.renderBody]: ({
    }={}) => {
        return (
            <View style={styles.body}>
            </View>
        );
    },

    [Name.renderFooter]: ({
    }={}) => {
        return (
            <View style={styles.footer}>
            </View>
        );
    },

    [Name.render]: ({
        title,
        month,
        remainder,
    }={}) => {
        return (
            <View style={styles.container}>
                {List_V1[Name.renderHeader]({
                    title,
                    month,
                    remainder,
                })}
                {List_V1[Name.renderBody]({
                })}
                {List_V1[Name.renderFooter]({
                })}
            </View>
        );
    },

    //[Name.renderHeader]: List_V1[Name.renderHeader].bind(List_V1),
    //[Name.render]: List_V1[Name.render].bind(List_V1),
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
    render: List_1[Name.render].bind(List_V1),
    //  the next release version should be added here ...
    ...{
        
        // **Note: the next updated functions here until a new version releases.
    }
};

// console.log('List',JSON.stringify(List[Name.renderTitle])) undefined
// console.log('List_f',JSON.stringify(List[Name.renderTitle]())) function
export default List.render;
export {
    Name,
    List as Function,
};



import React, { Component } from 'react';
import { 
    View,
    Text,
} from 'react-native';
import Name from './NavigationBar.design.interface'
import styles from './NavigationBar.style'
import Icon, { Size } from '../../../styles/Icon';
import Color from '../../../styles/Color';

const props = {
    tapped: {
        home: Icon.HomeTapped(Size.large),
        total: Icon.TotalTapped(Size.large),
        expenditure: Icon.ExpenditureTapped(Size.large),
        debt: Icon.DebtTapped(Size.large),
    },
    untapped: {
        home: Icon.HomeUntapped(Size.large),
        total: Icon.TotalUntapped(Size.large),
        expenditure: Icon.ExpenditureUntapped(Size.large),
        debt: Icon.DebtUntapped(Size.large),
    },
    add: Icon.Add(Size.huge),
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
    [Name.renderItems]: ({
        home= false,
        total= false,
        expenditure= false,
        debt= false,
    }={})=> {
        
        return (
            <View style={styles.container}>
                { home ? props.tapped.home : props.untapped.home }
                { total ? props.tapped.total : props.untapped.total }
                { props.add }
                { expenditure ? props.tapped.expenditure : props.untapped.expenditure }
                { debt ? props.tapped.debt : props.untapped.debt }
            </View>
            );
    },
    [Name.render]: ({
        home,
        total,
        expenditure,
        debt,
    }={})=> {
        console.log('home',JSON.stringify(home))
        console.log(JSON.stringify(total))
        console.log(JSON.stringify(expenditure))
        console.log(JSON.stringify(debt))
        return List_V1[Name.renderItems]({
            home,
            total,
            expenditure,
            debt,
        });
    }
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



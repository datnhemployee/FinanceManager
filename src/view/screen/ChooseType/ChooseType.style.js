import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Typeface, { Font,  } from '../../../styles/Font';
import Color from '../../../../src/styles/Color';

let {height} = Dimensions.get("window");
height = height - 30;

console.log(height);

export default StyleSheet.create({
    container: {
        padding: 10,
        height: height,
        // borderWidth: 10,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Color.Gray,
        height: 1 * height / 10,
    },
    body: {
        height: 8 * height / 10,
    },
    footer: {
        height: 1 * height / 10,
        borderTopWidth: 1,
        borderTopColor: Color.Gray,
    },
});

export const substyles = {
    header: {
        title: {
            flex: 5,
            ...Typeface.header[6],
            color: Color.Black,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        cancelButton: {
            flex: 1,
        },
        backButton: {
            flex: 1,
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cancelText: {
            flex: 1,
            ...Typeface.button,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Color.Red,
        }
    },
    body: {
        nameInput: {
            flex: 1,
            ...Typeface.header[5],
            borderRadius: 10,
            backgroundColor: Color.LightGray,
            margin: 5,
            textAlignVertical: 'top',
        },
        Info: {
            flex: 5,
            paddingLeft: 20,
            //paddingRight: 10,
            textAlignVertical: 'center',
            justifyContent: 'center',
        },
        SpendTitle: {
            fontFamily: Font.Roboro.Medium,
            fontSize: 30,
            color: Color.Red,
            borderBottomWidth : 2,
            borderBottomColor : 'lightgray',
            paddingLeft : 5,
            height : 40,
        },
        IncomeTitle: {
            fontFamily: Font.Roboro.Medium,
            fontSize: 30,
            color: Color.DarkGreen,
            borderBottomWidth : 2,
            borderBottomColor : 'lightgray',
            paddingLeft : 5,
            height : 40,
        }
    },
    footer: {
        saveButtonText: {
            flex: 1,
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.DarkGreen,
        },
        saveButton: {
            flex: 1,
        }
    }

}

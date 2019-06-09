import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Typeface from '../../../styles/Font';
import Color from '../../../../src/styles/Color';


let { width, height } = Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
    container: {
        height: height,
    },
    header: {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: Color.Gray,
        // height: 1 * height / 10,
        backgroundColor: Color.LightGray,
        padding: 10,
    },
    body: {
        height: 5 * height / 10,
        backgroundColor: Color.LightGray,
        padding: 10,
    },
    footer: {
        height: 1 * height / 10,
        backgroundColor: Color.LightGray,
        // borderTopWidth: 1,
        // borderTopColor: Color.Gray,
        padding: 10,
    },
});

export const substyles = {
    header: {
        title: {
            flex: 5,
            ...Typeface.header[6],
            color: Color.Black,
            textAlign: 'left',
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
            ...Typeface.body[1],
            borderRadius: 10,
            backgroundColor: Color.White,
            margin: 5,
            textAlignVertical: 'top',
        }
    },
    footer: {
        saveButtonText: {
            flex: 1,
            ...Typeface.body[1],
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.Black,
        },
        saveButton: {
            flex: 1,
        }
    }

}

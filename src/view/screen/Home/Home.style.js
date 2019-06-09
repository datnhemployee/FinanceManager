import { 
    StyleSheet, 
    Dimensions,
} from 'react-native';
import Typeface from '../../../styles/Font';
import Color from '../../../../src/styles/Color';
import ConstantValue from '../../../constant/ConstantValue';

let {width, height} =Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
    container: {
        // borderWidth: 1,
        // padding: 10,
        height: height,
        // flex: 1,
        // elevation: 3,
    },
    header:{
        // flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: Color.Gray,
        height: 1.5 * height / 10,
        justifyContent: `center`,
        alignItems: `center`,
        // borderWidth: 1,
        backgroundColor: Color.LightGray,
    },
    body:{
        // flex: 8,
        height: 7.5 * height / 10,
        backgroundColor: Color.LightGray,
        // borderWidth: 1,
    },
    footer:{
        // flex: 1,
        height: 1 * height / 10,
        // borderTopWidth: 1,
        // borderTopColor: Color.Gray,
        // borderWidth: 1,
        backgroundColor: Color.LightGray,
    },
});

export const substyles = {
    header: {
        top: {
            changeTitle: {
                // ...Typeface.header[5],
                ...Typeface.overline,
                textAlign: 'center',
                textAlignVertical: "center",
                // color: Color.Black,
                // borderWidth: 1,
            },
        },
        mid: {
            change: {
                // ...Typeface.header[3],
                ...Typeface.header[4],
                textAlign: 'center',
                textAlignVertical: "center",
                // color: Color.DarkGreen,
                color: Color.Black,
            }
        },
    },
    body: {
        cardDefaultList : {
            flex: 1,
            ...Typeface.header[4],
            color: Color.Gray,
            textAlign: 'center',
            textAlignVertical: "center",
        }
    },
    footer: {
        navigateButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        navigateButtonText: {
            flex: 1,
            ...Typeface.body[1],
            textAlign: 'center',
            textAlignVertical: 'center',
            width: width * 2 /3,
            margin: 10,
        }
    }

}

import { StyleSheet, Dimensions,  } from "react-native";
import Color from '../../../styles/Color'
import Typeface from "../../../styles/Font";

let {width, height} =Dimensions.get("window");
height = (height - 30 ) ;

let size = {
    footer: 2 * height / 10,
    body:  6 * height / 10,
    header:  2 * height / 10,
}
export default style = StyleSheet.create({
    footer: {
        // borderWidth: 1,
        height: size.footer,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    body: {
        // borderWidth: 1,
        height: size.body,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: size.header,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: height,
    },
})

export const substyles = {
    header: {
        dateLable: {
            height:size.header / 3,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.Black,
            ...Typeface.body[2],
        },
        spentLabel: {
            height:size.header / 3,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.Black,
            ...Typeface.overline,
        },
        spentMoney: {
            height:size.header / 3,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.Black,
            ...Typeface.header[4],
        },
    },
    footer: {
        scrollView: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            // borderWidth: 1,
            // height: size.footer,
        },
        snipet: {
            // height: size.footer,
        }
    },
}
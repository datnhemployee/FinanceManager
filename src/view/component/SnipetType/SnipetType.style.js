import { StyleSheet, Dimensions,  } from "react-native";
import Color from '../../../styles/Color'
import Typeface from "../../../styles/Font";

const width = 90
const height = 120

let size = {
    footer: 3 * height / 10,
    body:  5 * height / 10,
    header:  2 * height / 10,
}
export default style = StyleSheet.create({
    footer: {
        height: size.footer,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
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
        // borderWidth: 1,
        height: height,
        width: width,
    },
})

export const substyles = {
    header: {
        name: {
            flex: 1,
            ...Typeface.body[1],
            color: Color.Black,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
    },
    body: {
        icon: {
            flex: 1,
        },
    },
    footer: {
        total: {
            flex: 1,
            ...Typeface.body[2],
            color: Color.Black,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
    }
}
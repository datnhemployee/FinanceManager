import { StyleSheet,  } from "react-native";
import Color from '../../../styles/Color'

export default style = StyleSheet.create({
    body: {
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        paddingTop: 10,
        color: Color.Black,
        borderWidth: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
import { StyleSheet,  } from "react-native";
import Color from '../../../styles/Color'

export default style = StyleSheet.create({
    body: {
        width: 50,
        height: 50,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'top',
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
import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import { FontSize } from '../../../styles/Font';
import Color from '../../../styles/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        //borderWidth: 1,
        flexDirection: 'column',
        backgroundColor: Color.Green,
    },
    top: {
        // flex: 2,
        // // borderWidth: 1,
        // elevation: 1,
        // borderRadius: 50,

    },
    bottom: {
        flex: 8,
        borderWidth: 1,
    },
    middle: {
        flex: 1,
        elevation: 1,
        backgroundColor: Color.Red,
        // borderTopRightRadius: 100,
        borderWidth: 1,
        // marginLeft: 10,
    },
})

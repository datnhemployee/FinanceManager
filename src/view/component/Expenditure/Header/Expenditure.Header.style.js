import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import { FontSize } from '../../../../styles/Font';
import Color from '../../../../styles/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Green,
    },
    header_1: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_2: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: FontSize.intermediate,
    },
    month: {
        flex: 1,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: FontSize.intermediate,
    },
    remainder: {
        flex: 1,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: FontSize.intermediate,
    },
})

const style ={
    ...{style1,}

}
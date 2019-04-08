import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import Typeface, { Font } from '../../../../styles/Font';
import Color from '../../../../styles/Color';
import Component from './Note.Body.key'

export default StyleSheet.create({
    Container: {
        // borderBottomWidth: 5,
        flex: 1,
        // elevation: 3,
    },
    [Component.Header]:{
    },
    [Component.Body]:{
        flex: 5,
    },
    [Component.Footer]:{
    },
    [Component.Pager]:{
        flex: 13,
    },
    [Component.DateText]:{
        ...Typeface.overline,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export const Substyles = {
    [Component.Pager]:
        StyleSheet.create({
            BillForm: {
                flex: 1,
            },
            DetailForm: {
                flex: 1,
            },
    }),
    
}

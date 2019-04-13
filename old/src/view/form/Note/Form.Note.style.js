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
        // borderWidth: 1,
    },
    [Component.Body]:{
    },
    [Component.NavigationBar]:{
        flex: 1,
    },
    [Component.Footer]:{
        flex: 1,
    },
});

export const Substyles = {
    [Component.NavigationBar]:
        StyleSheet.create({
            NavigationContainer: {
                flex: 1,
                flexDirection: 'row',
            },
            navigationDetail: {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: Color.White,
            },
            navigationDetailText: {
                flex: 1,
                ...Typeface.header[6],
                color:Color.Gray,
                textAlign: 'center',
                textAlignVertical: 'center',
            },
            navigationBill: {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: Color.White,
            },
            navigationBillText: {
                flex: 1,
                ...Typeface.header[6],
                color:Color.Gray,
                textAlign: 'center',
                textAlignVertical: 'center',
            }
    }),
}

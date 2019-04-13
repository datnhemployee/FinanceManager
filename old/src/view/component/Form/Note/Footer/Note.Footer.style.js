import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import Typeface, { Font } from '../../../../styles/Font';
import Color from '../../../../styles/Color';
import Component from './Note.Footer.key'

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
    [Component.Footer]:{
        flex: 1,
        flexDirection: 'row',
    },
    [Component.AddNoteButton]:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    [Component.AddPictureButton]:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    [Component.NavigationButton]:{
        flex: 5,
        
    },
});

export const Substyles = {
    [Component.NavigationButton]:
        StyleSheet.create({
            button: {
                flex: 1,
                flexDirection: 'row',
            },
            text: {
                flex: 5,
                ...Typeface.body[1],
                borderBottomWidth: 1,
                borderBottomColor: Color.White,
                // borderWidth: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
            },
            number: {
                flex: 1,
                ...Typeface.body[2],
                color:Color.Gray,
                textAlign: 'center',
                textAlignVertical: 'center',
                // borderWidth: 1,
            },
    }),
    [Component.AddNoteButton]:
        StyleSheet.create({
            icon: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
    }),
}

import { 
    StyleSheet, 
} from 'react-native';
import Typeface from '../../../styles/Font';

export default StyleSheet.create({
    container: {
        // borderWidth: 1,
        flex: 1,
        // elevation: 3,
    },
    header:{
        flex: 1,
        // borderWidth: 1,
    },
    body:{
        flex: 8,
        // borderWidth: 1,
    },
    footer:{
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
    },
    dateLable: {
        flex: 1,
        ...Typeface.overline,
        textAlign: 'center',
        textAlignVertical: 'center',
        // borderWidth: 1,
    },  
});

export const substyles = {
    footer: StyleSheet.create({
        imageButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
        },
        notifyText: {
            flex: 1,
            ...Typeface.body[2],
            textAlign: 'center',
            textAlignVertical: 'center',
            // borderWidth: 1,
        },
        notifyButton: {
            flex: 8,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
        },
        sendButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
        },
    })
}

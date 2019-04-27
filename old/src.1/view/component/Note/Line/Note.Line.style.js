import { 
    StyleSheet, 
} from 'react-native';
import Typeface from '../../../../styles/Font';

export default StyleSheet.create({
    container: {
        // borderWidth: 1,
        flex: 1,
        // elevation: 3,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
    },
    body:{
        // flex: 1,
        // borderWidth: 1,
    },
    footer:{
        // borderWidth: 1,
    },
});

export const substyles = {
    body: StyleSheet.create({
        tickBox: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
        },
        textContainer: {
            flex: 3,
            // borderWidth: 1,
        },
        text: {
            flex: 3,
            ...Typeface.header[5],
            textAlign: 'center',
            textAlignVertical: 'center',
            borderWidth: 1,
        },
        picker: {
            flex:1,
            borderWidth: 1,
        },  
        subText: {
            flex: 2,
            ...Typeface.body[1],
            textAlign: 'center',
            textAlignVertical: 'center',
            // borderWidth: 1,
        },
    })
}

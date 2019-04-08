import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import { FontSize } from '../../../../styles/Font';
import Color from '../../../../styles/Color';



const style_V1 = {
    version: 0.1,
    author: [
        'Dat',
    ],
    date: new Date(2019,3,5),
    content: {
        container: {
            flex: 1,
            //borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.White,
            elevation: 1,
        },
        header_1: {
            flex: 1,
            //borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        header_2: {
            flex: 1,
            //borderWidth: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        left: {
            marginLeft: 10,
        },
        right: {
            marginRight: 10,
        },
        title: {
            flex: 1,
            //borderWidth: 1,
            textAlign: 'center',
            fontSize: FontSize.Large,
            color: Color.White,
            includeFontPadding: true,
            textAlignVertical: 'center',
        },
        month: {
            flex: 1,
            //borderWidth: 1,
            textAlign: 'center',
            fontSize: FontSize.intermediate,
            fontWeight: 'bold',
            color: Color.White,
            includeFontPadding: true,
            textAlignVertical: 'center',
        },
        remainder: {
            flex: 1,
            //borderWidth: 1,
            textAlign: 'center',
            fontSize: FontSize.small,
            color: Color.White,
        },
    }
}

const style = {
    ...style_V1.content,
    ...{

    }
}

export default StyleSheet.create(style);

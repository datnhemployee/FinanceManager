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
        'Dat'
    ],
    date: new Date(2019,3,5),
    content: {
        container: {
            flex: 1,
            //borderWidth: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: Color.Black,
        },
    },
}

const style = {
    ...style_V1.content,
    ...{

    }
}
export default StyleSheet.create(style);

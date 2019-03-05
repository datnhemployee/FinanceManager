import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import Color from '../../../styles/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: Color.Gray,
    },
})

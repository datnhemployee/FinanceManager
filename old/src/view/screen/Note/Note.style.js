import { 
    StyleSheet, 
} from 'react-native';
import Component from './Note.key'

export default StyleSheet.create({
    Container: {
        // borderBottomWidth: 5,
        flex: 1,
        // elevation: 3,
    },
    [Component.Header]:{
        flex: 1,
    },
    [Component.Body]:{
        flex: 8,
    },
    [Component.Footer]:{
        flex: 1,
    },
});

export const Substyles = {
}

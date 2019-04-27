import { 
    StyleSheet, 
} from 'react-native';

export default StyleSheet.create({
    container: {
        // borderBottomWidth: 5,
        flex: 1,
        // elevation: 3,
    },
    header:{
        flex: 1,
    },
    body:{
        flex: 8,
    },
    footer:{
        flex: 1,
    },
     
});

export const substyles = {
    header: {
        left: {
            flex: 1,
        },
        spent: {
            flex: 1,
        },
    }
}

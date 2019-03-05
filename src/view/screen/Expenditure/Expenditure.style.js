import { 
    StyleSheet, 
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        
        borderWidth: 1,
    },
    header: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        flex: 1,
    },
    body: {
        borderWidth: 1,
        borderColor: 'blue',
        flex: 5,
    },
    footer: {
        borderWidth: 1,
        flex: 1,
    },
})


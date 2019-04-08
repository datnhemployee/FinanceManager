import { 
    StyleSheet, 
} from 'react-native';

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
        },
        header: {
            //borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'red',
            flex: 1,
        },
        body: {
            //borderWidth: 1,
            borderColor: 'blue',
            flex: 5,
        },
        footer: {
            // borderWidth: 1,
            flex: 1,
        },
    }
}

const style = {
    ...style_V1.content,
    ...{

    }
}

export default StyleSheet.create(style);


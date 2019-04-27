import { 
    StyleSheet, 
    Dimensions,
} from 'react-native';
import Typeface from '../../../styles/Font';
import Color from '../../../../old/src/styles/Color';
import ConstantValue from '../../../constant/ConstantValue';


let {width, height} =Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
    container: {
        // borderWidth: 1,
        padding: 10,
        height: height,
        // flex: 1,
        // elevation: 3,
    },
    header:{
        // flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Color.Gray,
        height: 1 * height / 10,
        // borderWidth: 1,
        // borderWidth: 1,
    },
    body:{
        // flex: 8,
        height: 5 * height / 10,
        // borderWidth: 1,
    },
    footer:{
        // flex: 1,
        height: 1 * height / 10,
        borderTopWidth: 1,
        borderTopColor: Color.Gray,
        // borderWidth: 1,
        // borderRadius: 10,
    },
});

export const substyles = {
    header: StyleSheet.create({
        title: {
            flex: 5,
            ...Typeface.header[6],
            color: Color.Black,
            textAlign: 'left',
            textAlignVertical: 'center',
        },
        cancelButton: {
            flex: 1,
        },
        backButton: {
            flex: 1,
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cancelText: {
            flex: 1,
            ...Typeface.button,
            textAlign: 'left',
            textAlignVertical: 'center',
            color:Color.Red,
        }
    }),
    body: {
        container: {
            flex: 1,
        },
        top: {
            dateLable: {
                // flex: 1,
                // borderWidth: 1,
                height: 40,
                ...Typeface.overline,
                textAlign: 'center',
                textAlignVertical: 'center',
            },
        },
        mid: {
            typeInput: {
                container: {
                    flex: 2,
                },

                top: {
                    container: {
                        flex: 1,
                        flexDirection: 'row',
                    },
                    typeLableText: {
                        flex: 5,
                        ...Typeface.header[5],
                        margin: 5,
                        // color: Color.Black,
                        textAlign: 'left',
                        textAlignVertical: 'center',
                    },
                    editIcon: {
                        flex: 1,
                        margin: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                },

                mid: {
                    container: {
                        flex: 1,
                        flexDirection: 'row',
                    },
                    icon: {
                        flex: 1,
                    },
                    detail: {
                        container: {
                            flex: 3,
                        },
                        typeName: {
                            flex: 2,
                            ...Typeface.header[6],
                            color: Color.Black,
                        },
                        isIncome: {
                            flex: 1,
                            width: 50,
                            color: Color.White,
                            ...Typeface.body[2],
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            borderRadius: 10,
                        }
                    }
                },
                    
            },
            inputName: {
                flex: 1,
                ...Typeface.header[5],
                borderRadius: 10,
                backgroundColor: Color.LightGray,
                margin: 5,
                textAlignVertical: 'top',
            },
            inputPrice: {
                flex: 1,
                ...Typeface.header[5],
                borderRadius: 10,
                backgroundColor: Color.LightGray,
                margin: 5,
                textAlignVertical: 'top',
            
            },
            inputDescription: {
                height: 5 * height / 10,
                ...Typeface.header[5],
                borderRadius: 10,
                backgroundColor: Color.LightGray,
                margin: 5,
                textAlignVertical: 'top',
            }
        }
    },
    footer: {
        saveButtonText: {
            flex: 1,
            ...Typeface.button,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Color.DarkGreen,
        },
        saveButton: {
            flex: 1,
        }
    }

}

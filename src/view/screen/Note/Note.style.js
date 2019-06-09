import { 
    StyleSheet, 
    Dimensions,
} from 'react-native';
import Typeface from '../../../styles/Font';
import Color from '../../../../src/styles/Color';


let {width, height} =Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
    container: {
        // borderWidth: 1,
        // padding: 10,
        height: height,
        // flex: 1,
        // elevation: 3,
    },
    header:{
        // flex: 1,
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: Color.Gray,
        height: 1 * height / 10,
        backgroundColor: Color.LightGray,
        // borderWidth: 1,
        // borderWidth: 1,
    },
    body:{
        // flex: 8,
        height: 5 * height / 10,
        backgroundColor: Color.LightGray,
        // borderWidth: 1,
    },
    footer:{
        // flex: 1,
        height: 1 * height / 10,
        // borderTopWidth: 1,
        // borderTopColor: Color.Gray,
        backgroundColor: Color.LightGray,
        // borderWidth: 1,
        // borderRadius: 10,
    },
});

export const substyles = {
    header: {
        mid: {
            title: {
                flex: 5,
                ...Typeface.header[6],
                color: Color.Black,
                textAlign: 'left',
                textAlignVertical: 'center',
            },
        },
        right: {
            cancelButton: {
                flex: 1,
            },
            cancelText: {
                flex: 1,
                ...Typeface.button,
                textAlign: 'left',
                textAlignVertical: 'center',
                color:Color.Red,
            },
        },
        left: {
            backButton: {
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    },
    body: {
        container: {
            flex: 1,
        },
        top: {
        },
        mid: {
            datePicker: {
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.White,
                margin: 10,
                borderRadius: 5,
            },
            datePickerText: {
                flex: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                ...Typeface.button,
                color: Color.Black,
            },
            typeInput: {
                container: {
                    flex: 2,
                    margin: 10,
                    backgroundColor: Color.White,
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                },

                top: {
                    container: {
                        flex: 1,
                        flexDirection: 'row',
                    },
                    typeLableText: {
                        flex: 5,
                        // ...Typeface.header[5],
                        ...Typeface.body[1],
                        margin: 5,
                        // color: Color.Black,
                        textAlign: 'left',
                        textAlignVertical: 'center',
                    },
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
                            // ...Typeface.body[1],
                            color: Color.Black,
                        },
                        isIncome: {
                            flex: 1,
                            width: 50,
                            color: Color.White,
                            // ...Typeface.body[2],
                            ...Typeface.overline,
                            // textAlign: 'center',
                            textAlignVertical: 'center',
                            // borderRadius: 10,
                        }
                    }
                },
                    
            },
            inputName: {
                flex: 1,
                // ...Typeface.header[5],
                ...Typeface.body[1],
                borderRadius: 10,
                backgroundColor: Color.White,
                margin: 10,
                textAlignVertical: 'top',
                padding: 5,
            },
            inputPrice: {
                flex: 1,
                ...Typeface.body[1],
                // ...Typeface.header[5],
                borderRadius: 10,
                backgroundColor: Color.White,
                margin: 10,
                textAlignVertical: 'top',
                padding: 5,
            },
            inputDescription: {
                height: 5 * height / 10,
                ...Typeface.body[1],
                // ...Typeface.header[5],
                borderRadius: 10,
                backgroundColor: Color.White,
                margin: 10,
                textAlignVertical: 'top',
                padding: 5,
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

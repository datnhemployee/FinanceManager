import { 
    StyleSheet, 
    Picker,
    View,
    Text,
} from 'react-native';
import Typeface, { Font } from '../../../../styles/Font';
import Color from '../../../../styles/Color';
import Component from './Note.Header.key'

export default StyleSheet.create({
    Container: {
        borderBottomWidth: 5,
        borderBottomColor: Color.Gray,
        flex: 1,
        // elevation: 3,
    },
    [Component.Header]:{
        flex: 5,
        // borderWidth: 1,
    },
    [Component.Exspense]:{
        flex: 1,
        flexDirection: 'column',
    },
    [Component.Body]:{
        flex: 3,
        flexDirection: 'column',
    },
    [Component.ConfirmBar]:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
    },
    [Component.DateLabel]:{
        flex: 1,
        justifyContent: 'center',
    },
    [Component.NavigationBar]:{
        flex: 1,
    },
});

export const Substyles = {
    [Component.Exspense]:
        StyleSheet.create({
            ValueText: {
                flex: 2,
                ...Typeface.header[1],
                color: Color.Black,
                textAlign: 'center',
                textAlignVertical: 'center',
                includeFontPadding: false,
                // textShadowColor: Color.Blue,
                // textShadowRadius: 5,
                // textShadowOffset: {width: 5,height: 2},
                // borderWidth: 1,
            },
            Text: {
                flex: 1,
                ...Typeface.header[5],
                color: Color.Gray,
                textAlign: 'center',
                fontWeight: '200',
                letterSpacing: 0.15,
            }
        }),
        [Component.ConfirmBar]:
            StyleSheet.create({
                confirmButtonContainer: {
                    flex: 4,
                    color: Color.Black,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                },
                confirmButton: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Color.DarkGreen,
                    borderRadius: 20,
                },
                confirmButtonText: {
                    flex: 1,
                    ...Typeface.button,
                    color: Color.White,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    // borderWidth: 1,
                },
                iconMoreContainer: {
                    flex: 2,
                    justifyContent: 'flex-start',
                    borderRadius: 20,
                    flexDirection: 'row',
                    
                },
                iconMoreButton: {
                    flex: 1,
                    justifyContent: 'center',
                },
                iconMore: {
                    flex: 1,
                    textAlign: 'center',
                    borderColor: Color.DarkGreen,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                leftGap: {
                    flex: 1,
                },
                rightGap: {
                    flex: 1,
                },
        }),
        [Component.DateLabel]:
            StyleSheet.create({
                confirmButtonText: {
                    flex: 1,
                    ...Typeface.subtitle[1],
                    color: Color.Gray,
                    textAlign: 'center',
                },
        }),
        [Component.NavigationBar]:
            StyleSheet.create({
                NavigationContainer: {
                    flex: 1,
                },
                navigationDetail: {

                },
                navigationDetailText: {

                },
                navigationBill: {

                },
                navigationBillText: {

                }
        }),
}

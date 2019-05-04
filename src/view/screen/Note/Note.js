
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    ToastAndroid,
} from 'react-native';
import styles, { substyles } from './Note.style';
import params from './Note.default';
import { format, gap } from '../../../utils/DateConvert';
import Type from '../../../model/Type';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';
import { ScrollView } from 'react-native-gesture-handler';
import Spense from '../../../model/Spense';
import SpenseController from '../../../controller/SpenseController';
import TypeController from '../../../controller/TypeController';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            spense: {
                name: `Không tên`,
                description: `Không`,
                price : 0,
            },
            // isAvailable_name: false,
            // isAvailable_price: false,
            isIncome: false,
            typeName: 'Không tên',
        }

        this._backButtonOnClick = this._backButtonOnClick.bind(this);
        this._onChangeDescription = this._onChangeDescription.bind(this);
        this._onChangeName = this._onChangeName.bind(this);
        this._onChangePrice = this._onChangePrice.bind(this);
    }

    async componentDidMount ( ) {
        this.setState({
            isIncome: await TypeController.isIncome(
                this.state.spense.typeID,
            ),
        });
        
    }

    _onInputChange (text, key) {
        let {
            spense,
        } = this.state;
        this.setState({spense: {
            ...spense,
            ...{
                [key]: text,
            },
        }});
        
    }

    _onChangeName (text) {
        this._onInputChange(text,'name');
        // if(!!this.state.spense.name){
        //     this.setState({isAvailable_name: true});
        // } else {
        //     this.setState({isAvailable_name: false});
        // }
        // console.log('isAvailable_name',this.state.isAvailable_name)
    }

    _onChangePrice (text) {
        this._onInputChange(text,'price')
        // if(!!this.state.spense.price){
        //     this.setState({isAvailable_price: true});
        // } else {
        //     this.setState({isAvailable_price: false});
        // }
        // console.log('isAvailable_price',this.state.isAvailable_price)
    }

    _onChangeDescription (text) {
        this._onInputChange(text,'description')
    }

    async _backButtonOnClick () {
        let {
            backButtonOnClick,
        } = this.getProps();

        let isAvailable_name = !!this.state.spense.name || this.state.spense.name != '';
        let isAvailable_price = !!this.state.spense.price || this.state.spense.price != 0;

        if(!isAvailable_name
            || !isAvailable_price){
            ToastAndroid.show('Tên giao dịch và số tiền không hợp lệ. Lưu thất bại', ToastAndroid.LONG)
            await backButtonOnClick();
            return;
        }
        let isIncome = TypeController.isIncome(0);
        if(!isIncome){
            isIncome = false;
        }

        await SpenseController.insert({
            ...this.state.spense,
            ...{
                price: Math.abs(parseInt(this.state.spense.price)) * (isIncome?+1:-1),
                dayID: gap().day(),
            }
        })
        await backButtonOnClick();
        ToastAndroid.show('Lưu dữ liệu thành công.', ToastAndroid.LONG)
    }

    getProps () {
        let {
            isNavigatedToNote = false,
            // type = Type.default(),
            backButtonOnClick = () => {console.log(`Vừa nhấn trở lại`)},
            // cancelButtonOnClick = () => {console.log(`Vừa nhấn hủy`)},
            editButtonOnClick = () => {console.log(`Vừa nhấn sửa loại`)},
            // saveButtonOnClick = () => {console.log(`Vừa nhấn lưu`)},
        } = this.props;
        return {
            isNavigatedToNote,
            // type,
            backButtonOnClick,
            // cancelButtonOnClick,
            editButtonOnClick,
            // saveButtonOnClick,
        }
    }

    // saveButton() {
    //     let {
    //         saveButtonOnClick,
    //     } = this.getProps();
    //     let localStyles = substyles.footer;
    //     return (
    //         <TouchableOpacity
    //             style={localStyles.saveButton}
    //             onPress={saveButtonOnClick}>
    //             <Text 
    //             style={localStyles.saveButtonText}
    //             > 
    //             {params.saveButtonText}
    //             </Text>
    //         </TouchableOpacity>
    //         );
    // }

    // cancelButton () {
    //     let {
    //         cancelButtonOnClick,
    //     } = this.getProps();
    //     let localStyles = substyles.header.right;
    //     return (
    //         <TouchableOpacity 
    //             style={localStyles.cancelButton}
    //             onPress={cancelButtonOnClick}>
    //             <Text 
    //                 style={localStyles.cancelText}>
    //                 {params.cancelText}
    //             </Text>
    //         </TouchableOpacity>
    //     )
    // }

    dateLable () {
        let localStyles = substyles.body.top;
        return (
            <Text 
                style={localStyles.dateLable}>
                {params.dateLableText}
            </Text>
        )
    }

    typeLabel () {
        const localStyles = substyles.body.mid.typeInput.top;
        return (
            <Text style={localStyles.typeLableText} >
                {params.typeLabelText}
            </Text>
        )
    }

    editIcon () { 
        let {
            editButtonOnClick,
        } = this.getProps();
        const localStyles = substyles.body.mid.typeInput.top;
        return (
            <TouchableOpacity 
                onPress={editButtonOnClick}
                style={localStyles.editIcon} >
                {params.editIcon}
            </TouchableOpacity>
        )
    }

    typeName () {
        let {
            // type,
        } =   this.getProps()
        const localStyles = substyles.body.mid.typeInput.mid.detail;
        return (
            <Text style={localStyles.typeName} >
                {Typeface.toCase({
                    text: this.state.typeName,
                    type: Typeface.type.default,
                })}
            </Text>
        )
    }

    isIncome () {
        let {
            // type,
        } = this.getProps()
        const localStyles = substyles.body.mid.typeInput.mid.detail;
        return (
            <Text style={[
                localStyles.isIncome,
                this.state.isIncome ? {
                    backgroundColor: Color.LightGreen,
                }:{
                    backgroundColor: Color.Red,
                }]} >
                {this.state.isIncome ? 
                    params.income:
                    params.outcome}
            </Text>
        )
    }

    title() {
        let localStyles = substyles.header.mid;
        return (
            <Text style={localStyles.title}>
                {params.title}
            </Text>
        )
    }

    inputType () {
        let {
            // type,
        } =   this.getProps();
        const localStyles = substyles.body.mid.typeInput;
        return (
            <View style={localStyles.container} >
                <View style={localStyles.top.container} >
                    {this.typeLabel()}
                    {this.editIcon()}
                </View>

                <View style={localStyles.mid.container} >
                    <FirstLetterIcon 
                        style={localStyles.mid.icon}
                        firstLetter={this.state.typeName === 'Không tên' ? 
                            undefined:
                            this.state.typeName[0]
                        }
                    />

                    <View style={localStyles.mid.detail.container} >
                        {this.typeName()}
                        {this.isIncome()}
                    </View>

                </View>

            </View>
        )
    }

    inputName () {
        return (
            <TextInput 
                keyboardType ={'email-address'}
                style={substyles.body.mid.inputName}
                placeholder={params.placeholder.inputName}
                onChangeText={(text) => {this._onChangeName(text)}}
            />
        )
    }

    inputPrice () {
        return (
            <TextInput 
                keyboardType ={'number-pad'}
                style={substyles.body.mid.inputPrice}
                placeholder={params.placeholder.inputPrice}
                onChangeText={(text) => {this._onChangePrice(text)}}
            />
        )
    }

    inputDescription () {
        return (
            <TextInput 
                keyboardType ={'email-address'}
                style={substyles.body.mid.inputDescription}
                placeholder={params.placeholder.inputDescription}
                multiline={true}
                onChangeText={(text) => {this._onChangeDescription(text)}}
            />
        )
    }

    topBody () {
        return this.dateLable();
    }

    midBody () {
        let {

        } = this.props;
        return (
            <View style={substyles.body.container}>
                {this.inputName()}
                {this.inputType()}
                {this.inputPrice()}
                {this.inputDescription()}
            </View>
        )
    }

    bottomBody () {
        return (<View></View>)
    }

    backButton () {
        let {
        } =   this.getProps();
        const localStyle = substyles.header.left;
        return (
            <TouchableOpacity 
                style={localStyle.backButton}
                onPress={async () => {await this._backButtonOnClick()}}>
                {params.backButtonIcon}
            </TouchableOpacity>
        )
    }

    leftHeader () {
        return this.backButton();
    }
    midHeader () {
        return this.title();
    }
    rightHeader () {
        // return this.cancelButton();
        return (<View />);
    }
    header () {
    return (
        <View style={styles.header}>
            {this.leftHeader()}
            {this.midHeader()}
            {this.rightHeader()}
        </View>
    );
    }

    body () {
        let {
        } = this.props;
        return (
            <ScrollView 
                style={styles.body}
                showsVerticalScrollIndicator={false}>
                {this.topBody()}
                {this.midBody()}
                {this.bottomBody()}
            </ScrollView>
        );
    }

    // footer () {
    //     return (
    //         <View style={styles.footer}>
    //             {this.saveButton()}
    //         </View>
    //     );
    // }

      render() {
        let {
            isNavigatedToNote,
        } =   this.getProps();

        return (
            <Modal 
                transparent={false}
                visible={isNavigatedToNote}
                animationType="slide">
                <KeyboardAvoidingView 
                style={styles.container}
                behavior='padding'
                >
                    {this.header()}
                    {this.body()}
                    {/* {this.footer()} */}
                </KeyboardAvoidingView>
            </Modal>
            
        )
    }
}







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
import { format, getID } from '../../../utils/DateConvert';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';
import { ScrollView } from 'react-native-gesture-handler';
import SpenseController from '../../../controller/SpenseController';
import TypeController from '../../../controller/TypeController';
import Navigation from '../../../constant/Navigation';
import ChooseType from '../ChooseType/ChooseType';
import Type from '../../../model/Type';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            spense: {
                name: ``,
                description: ``,
                price : 0,
            },
            // isAvailable_name: false,
            // isAvailable_price: false,
            isIncome: false,
            type: Type.default(),
            navigation: Navigation.note,
        }

        this._backButtonOnClick = this._backButtonOnClick.bind(this);
        this._onChangeDescription = this._onChangeDescription.bind(this);
        this._onChangeName = this._onChangeName.bind(this);
        this._onChangePrice = this._onChangePrice.bind(this);
        this._navigateToChooseType = this._navigateToChooseType.bind(this);
        this.Type_backButtonOnClick = this.Type_backButtonOnClick.bind(this);
    }

    async componentDidMount ( ) {
        this.setState({
            isIncome: await TypeController.isIncome(
                this.state.spense.typeID,
            ),
        });
        
    }

    _onInputChange (text, key) {
        
        this.setState({spense: {
            ...this.state.spense,
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

        console.log('đây nè: '+ this.state.spense.name);
        console.log('đây nè: '+ this.state.spense.price);
        let isAvailable_name = !!this.state.spense.name || this.state.spense.name != '';
        let isAvailable_price = !!this.state.spense.price || this.state.spense.price != 0;

        if(!isAvailable_name
            || !isAvailable_price){
            ToastAndroid.show('Tên giao dịch và số tiền không hợp lệ. Lưu thất bại', ToastAndroid.LONG)
            await backButtonOnClick();
            return;
        }
        let isIncome = await TypeController.isIncome(0);
        let priceToSave = Math.abs(parseInt(this.state.spense.price));
        if(!isIncome){
            priceToSave = priceToSave * -1;
        }

        let dayIDToSave = getID().day();
        
        const spenseToDB = {
            ...this.state.spense,
            ...{
                price: priceToSave,
                dayID: dayIDToSave,
            }
        }
        console.log(JSON.stringify(spenseToDB))

        await SpenseController.insert(spenseToDB);
        await backButtonOnClick(priceToSave,dayIDToSave);
        ToastAndroid.show('Lưu dữ liệu thành công.', ToastAndroid.LONG)
    }

    getProps () {
        let {
            isNavigatedToNote = false,
            backButtonOnClick = () => {console.log(`Vừa nhấn trở lại`)},
        } = this.props;
        return {
            isNavigatedToNote,
            backButtonOnClick,
        }
    }

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

    typeName () {
        let {
            // type,
        } =   this.getProps()
        const localStyles = substyles.body.mid.typeInput.mid.detail;
        return (
            <Text style={localStyles.typeName} >
                {Typeface.toCase({
                    text: this.state.type.name,
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

    _navigateToChooseType () {
        console.log('qua màn hình chooseType',this.state.navigation);
        this.setState({navigation: Navigation.chooseType})
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
                </View>
                <TouchableOpacity 
                    style={localStyles.mid.container}
                    onPress={this._navigateToChooseType}>
                    <FirstLetterIcon 
                        style={localStyles.mid.icon}
                        firstLetter={!this.state.type.name ? 
                            undefined:
                            this.state.type[0]
                        }
                        color={this.state.type.color}
                    />

                    <View style={localStyles.mid.detail.container} >
                        {this.typeName()}
                        {this.isIncome()}
                    </View>
                </TouchableOpacity>
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

    Type_backButtonOnClick (type) {
        this.setState({
            type: type,
            navigation: Navigation.note,
        });
    }
    // footer () {
    //     return (
    //         <View style={styles.footer}>
    //             {this.saveButton()}
    //         </View>
    //     );
    // }

    chooseType () {
        return (
            <ChooseType 
                isNavigatedToChooseType = {this.state.navigation === Navigation.chooseType}
                backButtonOnClick = {this.Type_backButtonOnClick}
            />);
    }

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
                        {this.chooseType()}
                </KeyboardAvoidingView>
            </Modal>
            
        )
    }
}






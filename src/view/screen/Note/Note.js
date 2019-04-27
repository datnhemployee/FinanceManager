
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import styles, { substyles } from './Note.style';
import params from './Note.default';
import { format } from '../../../utils/DateConvert';
import Type from '../../../model/Type';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';
import { ScrollView } from 'react-native-gesture-handler';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    getProps () {
        let {
            isNavigatedToNote = false,
            type = Type.default(),
            backButtonOnClick = () => {console.log(`Vừa nhấn trở lại`)},
            cancelButtonOnClick = () => {console.log(`Vừa nhấn hủy`)},
            editButtonOnClick = () => {console.log(`Vừa nhấn sửa loại`)},
            saveButtonOnClick = () => {console.log(`Vừa nhấn lưu`)},
        } = this.props;
        return {
            isNavigatedToNote,
            type,
            backButtonOnClick,
            cancelButtonOnClick,
            editButtonOnClick,
            saveButtonOnClick,
        }
    }

    saveButton() {
        let {
            saveButtonOnClick,
        } = this.getProps();
        return (
            <TouchableOpacity
                style={substyles.footer.saveButton}
                onPress={saveButtonOnClick}>
                <Text 
                style={substyles.footer.saveButtonText}
                > 
                {params.saveButtonText}
                </Text>
            </TouchableOpacity>
            
            );
    }

    cancelButton () {
        let {
            cancelButtonOnClick,
        } = this.getProps();
        return (
            <TouchableOpacity 
                style={substyles.header.cancelButton}
                onPress={cancelButtonOnClick}>
                <Text 
                    style={substyles.header.cancelText}>
                    {params.cancelText}
                </Text>
            </TouchableOpacity>
        )
    }

    dateLable () {
        return (
            <Text 
                style={substyles.body.top.dateLable}>
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
            type,
        } =   this.getProps()
        const localStyles = substyles.body.mid.typeInput.mid.detail;
        return (
            <Text style={localStyles.typeName} >
                {Typeface.toCase({
                    text: type.name,
                    type: Typeface.type.default,
                })}
            </Text>
        )
    }

    isIncome () {
        let {
            type,
        } = this.getProps()
        const localStyles = substyles.body.mid.typeInput.mid.detail;
        return (
            <Text style={[
                localStyles.isIncome,
                type.isIncome ? {
                    backgroundColor: Color.LightGreen,
                }:{
                    backgroundColor: Color.Red,
                }]} >
                {type.isIncome ? 
                    params.income:
                    params.outcome}
            </Text>
        )
    }

    title() {
        return (
            <Text style={substyles.header.title}>
                {params.title}
            </Text>
        )
    }

    inputType () {
        let {
            type,
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
                        firstLetter={type._id === 0 ? 
                            undefined:
                            type.name[0]
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
            />
        )
    }

    inputPrice () {
        return (
            <TextInput 
                keyboardType ={'number-pad'}
                style={substyles.body.mid.inputPrice}
                placeholder={params.placeholder.inputPrice}
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
            backButtonOnClick,
        } =   this.getProps();
        return (
            <TouchableOpacity 
                style={substyles.header.backButton}
                onPress={backButtonOnClick}>
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
        return this.cancelButton();
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
                showsVerticalScrollIndicator={false}>>
                {this.topBody()}
                {this.midBody()}
                {this.bottomBody()}
            </ScrollView>
        );
    }

    footer () {
        return (
            <View style={styles.footer}>
                {this.saveButton()}
            </View>
        );
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
                    {this.footer()}
                </KeyboardAvoidingView>
            </Modal>
            
        )
    }
}






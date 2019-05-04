
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import styles, { substyles } from './Home.style';
import params from './Home.default';
import { format } from '../../../utils/DateConvert';
import Type from '../../../model/Type';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';
import { ScrollView } from 'react-native-gesture-handler';
import Note from '../Note/Note';
import Total from '../../../model/Total';
import Card from '../../component/Card/Card';
import SpenseController from '../../../controller/SpenseController';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isNavigatedToNote: false,
            change: 0,
            totalList: [],
        }

        this.navigate = this.navigate.bind(this);
        this.backButtonOnClick = this.backButtonOnClick.bind(this);
        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    }

    async componentDidMount () {

        this.setState({change: await SpenseController.getChange()});
        // console.log('this.state.change',JSON.stringify(this.state))

        let today = new Date();
        let temp = [
            await SpenseController.getDailyTotal(
                today.getDate(),
                today.getMonth(),
                today.getFullYear(),
            ),
        ];
        console.log('temp',JSON.stringify(temp))

        if(!temp[0])
            this.setState({totalList: [Total.default()]});
        else 
            this.setState({totalList: temp});
        console.log('totalList',JSON.stringify(this.state.totalList))
    }

    cancelButtonOnClick () {
        this.navigate();
    }

    navigate () {
        let temp = !this.state.isNavigatedToNote;

        this.setState({isNavigatedToNote: temp});
    }

    getProps () {
        let {
            
        } = this.props;
        return {
        }
    }

    async backButtonOnClick (price) {
        this.navigate();

        await SpenseController.saveChange(price);
    }

    navigateNoteButton () {
        return (
            <TouchableOpacity 
                style={substyles.footer.navigateButton}
                onPress={this.navigate}
                >
                <Text 
                    style={substyles.footer.navigateButtonText}>
                    {params.navigateButtonText}
                </Text>
            </TouchableOpacity>
        )
    }

    changeTitle () {
        const localStyles = substyles.header.top;
        return (
            <Text 
                style={localStyles.changeTitle}>
                {params.changeTitle}
            </Text>
        )
    }

    change () {
        let {
        } = this.getProps();

        const localStyles = substyles.header.mid;
        return (
            <Text 
                style={localStyles.change}>
                {/* {params.changeTitle} */}
                {Typeface.toCase({
                    text: this.state.change + ' đ',
                    type: Typeface.type.default,    
                })} 
            </Text>
        )
    }

    topHeader () {
        return this.changeTitle();
    }
    midHeader () {
        return this.change();
    }
    botHeader () {
        return (<View/>)
    }
    header () {
        return (
            <View style={styles.header}>
                {this.topHeader()}
                {this.midHeader()}
                {this.botHeader()}
            </View>
        );
    }

    body () {
        let {
        } = this.getProps();

        console.log(JSON.stringify(this.state.totalList))
        return (
            <ScrollView 
                on
                style={styles.body}
                showsVerticalScrollIndicator={false}>
                {this.state.totalList.map((val)=> {
                    console.log(JSON.stringify(val))
                    return (
                    <Card 
                        // style={{flex: 1}}
                        key = {val.Id + val.total}
                        dayID = {val.Id}
                        total = {val.total}
                        types = {val.typeList}
                    />)}
                )}
            </ScrollView>
        );
    }

    footer () {
        return (
            <View style={styles.footer}>
                {this.navigateNoteButton()}
            </View>
        );
    }

    note () {
        return (
            <Note 
                isNavigatedToNote= {this.state.isNavigatedToNote}
                backButtonOnClick = {this.backButtonOnClick}
                cancelButtonOnClick = {this.cancelButtonOnClick}/>
        )
    }

    render() {
        return (
            <View 
            style={styles.container}
            // behavior='padding'
            >
                {this.note()}
                <Modal 
                    transparent={false}
                    visible={!this.state.isNavigatedToNote}
                    animationType="slide">
                    <View style={styles.container}>
                        {this.header()}
                        {this.body()}
                        {this.footer()}
                    </View>
                </Modal>
            </View>

        )
    }
}


import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native';
import styles, { substyles } from './Home.style';
import params from './Home.default';
import { format, getDatesFromID } from '../../../utils/DateConvert';
import Type from '../../../model/Type';
import FirstLetterIcon from '../../component/FirstLetterIcon/FirstLetterIcon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';
import { ScrollView } from 'react-native-gesture-handler';
import Note from '../Note/Note';
import Total from '../../../model/Total';
import Card from '../../component/Card/Card';
import SpenseController from '../../../controller/SpenseController';
import Detail from '../Detail/Detail';
import Navigation from '../../../constant/Navigation';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            navigation: Navigation.home,
            change: 0,
            currentDailyList: [],
            month: new Date(),
            detailedTotal: Total.default().monthlyList[0].dailyList[0].typeList,
            detailedDate: new Date(),
        }

        this.Note_backButtonOnClick = this.Note_backButtonOnClick.bind(this);
        this.navigateToNote = this.navigateToNote.bind(this);
        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    async onRefresh() {
        await this.onEndReached();
    }
    async onEndReached() {

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
            this.setState({currentDailyList: Total.default().monthlyList[0].dailyList});
        else 
            this.setState({currentDailyList: temp});
        console.log('totalList',JSON.stringify(this.state.currentDailyList))
    }

    cancelButtonOnClick () {
        this.setState({navigation: Navigation.home});
    }

    getProps () {
        let {
            
        } = this.props;
        return {
        }
    }

    async Note_backButtonOnClick (price) {
        if(!price) price = 0;
        let changeFromDB = await SpenseController.getChange();
        await SpenseController.saveChange(changeFromDB + price);

        this.setState({
            navigation: Navigation.home,
            change: changeFromDB + price,
        })
    }

    navigateToNote() {
        this.setState({navigation: Navigation.note});
    }

    navigateNoteButton () {
        return (
            <TouchableOpacity 
                style={substyles.footer.navigateButton}
                onPress={this.navigateToNote}
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

        return (
            <FlatList 
            style={styles.body}
            showsVerticalScrollIndicator={false}
            data={this.state.currentDailyList}
            renderItem={({Id,total,typeList}) => (
                <Card 
                    // style={{flex: 1}}
                    key = {Id + total}
                    dayID = {Id}
                    total = {total}
                    typeList = {typeList}
                    getDetail = {this.getDetail}
                />
            )}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            onRefresh={this.onRefresh}
            keyExtractor={(item,index) => 'SpenseInDate'+index}/>
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
                isNavigatedToNote= {this.state.navigation === Navigation.note}
                backButtonOnClick = {this.Note_backButtonOnClick}
                />
        )
    }

    detail () {
        let {
        } = this.getProps();
        // console.log('Home detailedTotal', JSON.stringify(this.state.detailedTotal.typeList));
        return (
            <Detail
                detailedList= {this.state.detailedTotal}
                detailedDate = {this.state.detailedDate}
                isNavigatedToDetail = {this.state.navigation === Navigation.detail}
                navigateToNote = {this.navigateToNote}
                backButtonOnClick = {this.Note_backButtonOnClick}
            />
        )
    }

    getDetail(
        dateID,
        total,
    ) {
        

        let date = getDatesFromID(dateID);
        let dateToDetail = new Date(date.year,date.month,date.day);

        this.setState({
            detailedTotal: total,
            detailedDate: dateToDetail,
            navigation: Navigation.detail,
        })
    }

    render() {
        return (
            <View 
            style={styles.container}
            // behavior='padding'
            >
                {this.detail()}
                {this.note()}
                <Modal 
                    transparent={false}
                    visible = {this.state.navigation === Navigation.home}
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

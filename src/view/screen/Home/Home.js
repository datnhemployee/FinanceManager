
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    FlatList,
    ToastAndroid,
    AsyncStorage,
} from 'react-native';
import styles, { substyles } from './Home.style';
import params from './Home.default';
import Typeface from '../../../styles/Font';
import Note from '../Note/Note';
import Card from '../../component/Card/Card';
import SpenseController from '../../../controller/SpenseController';
import Detail from '../Detail/Detail';
import Navigation from '../../../constant/Navigation';
import ConstantRepository from '../../../repository/ConstantRepository';
import Day from '../../../model/Day';
import Codes from '../../../constant/Codes';
import Spense from '../../../model/Spense';
import Type from '../../../model/Type';
import Color from '../../../styles/Color';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            navigation: Navigation.home,
            wallet: 0,
            dayList: [],
            detailedDate: Day.default(),
            currentPage: 1,
            refreshing: false,
        }


        this.backButtonOnClick = this.backButtonOnClick.bind(this);
        this.navigateToNote = this.navigateToNote.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.deleteAllButtonOnClick = this.deleteAllButtonOnClick.bind(this);
        this.deleteSpense = this.deleteSpense.bind(this);
    }

    async deleteAllButtonOnClick (dayID,total) {
        let walletFromDB = await ConstantRepository.getWallet();
        console.log('deleteAllButtonOnClick',JSON.stringify(walletFromDB))
        console.log('deleteAllButtonOnClick',JSON.stringify(walletFromDB.content - total))
        await SpenseController.removeByDate(dayID);
        await ConstantRepository.setWallet(walletFromDB.content - total);
        walletFromDB = await ConstantRepository.getWallet();

        console.log('deleteAllButtonOnClick',JSON.stringify(walletFromDB))
        this.setState({
            dayList: this.state.dayList.filter((val)=> val.dayID != dayID),
            navigation: Navigation.home,
            wallet: walletFromDB.content,
        })
    }

    async onRefresh() {
        console.log('onrefresh');
        await this.onEndReached();
    }

    async onEndReached() {
        console.log('onEndReach');
        let {
            code: codeGetMaxPage,
            content: contentGetMaxPage
        } = await ConstantRepository.getMaxPage();
        console.log('maxPage',contentGetMaxPage)

        if(codeGetMaxPage != Codes.Success){
            ToastAndroid.show(
                contentGetMaxPage,
                ToastAndroid.LONG,
            );
            return;
        }
        let currentPage = this.state.currentPage;
        console.log('currentPage',currentPage)

        if (currentPage + 1 > contentGetMaxPage) {
            ToastAndroid.show(
                `Đã lấy hết tổng kết chi tiêu trong dữ liệu.`,
                ToastAndroid.LONG,
            );
            
            return;
        }
        await this.updateDayList(currentPage + 1);
        
    }

    async updateDayList (page) {
        console.log('updateDayList');
        SpenseController.getPage(page,(res)=>{

            if(res.code === Codes.Success){
                let temp = this.state.dayList.slice();
                let start = ((page -1) * 5);
                let count = this.state.dayList.length - start;
                temp.splice(start,count);
                // console.log('render',JSON.stringify(res.content))

                this.setState({
                    dayList: temp.concat(res.content),
                    currentPage: page,
                    refreshing: true,
                });
                this.setState({
                    refreshing: false,
                })
            } 
            else {
                    ToastAndroid.show(
                    res.content,
                    ToastAndroid.LONG,
                );
            }

        });

        
    }

    async componentDidMount () {
        console.log('updateDayList');

        let wallet = await ConstantRepository.getWallet();
        // console.log('wallet didMount',JSON.stringify(wallet));

        if(wallet.code != Codes.Success){
            ToastAndroid.show(
                wallet.content,
                ToastAndroid.LONG,
            );
            return;
        }
        let currentPage = this.state.currentPage;

        await this.updateDayList(currentPage);
        this.setState({
            wallet: wallet.content,
        })
    }

    getProps () {
        let {
            
        } = this.props;
        return {
        }
    }
    async deleteSpense (price) {
        if(!price) price = 0;

        let walletFromDB = await ConstantRepository.getWallet();
        

        if(walletFromDB.code != Codes.Success){
            ToastAndroid.show(
                walletFromDB.content,
                ToastAndroid.LONG,
            );
            return;
        }
        walletFromDB = await ConstantRepository.setWallet(walletFromDB.content - price);
        if(walletFromDB.code != Codes.Success){
            ToastAndroid.show(
                walletFromDB.content,
                ToastAndroid.LONG,
            );
            return;
        }

        this.setState({
            navigation: Navigation.home,
            wallet: walletFromDB.content,
        })

        await this.updateDayList(this.state.currentPage);
    }

    async backButtonOnClick (price) {
        if(!price) price = 0;

        let walletFromDB = await ConstantRepository.getWallet();

        if(walletFromDB.code != Codes.Success){
            ToastAndroid.show(
                walletFromDB.content,
                ToastAndroid.LONG,
            );
            return;
        }
        walletFromDB = await ConstantRepository.setWallet(walletFromDB.content + price);
        if(walletFromDB.code != Codes.Success){
            ToastAndroid.show(
                walletFromDB.content,
                ToastAndroid.LONG,
            );
            return;
        }

        this.setState({
            navigation: Navigation.home,
            wallet: walletFromDB.content,
        })
        await this.updateDayList(this.state.currentPage);
    }

    navigateToNote() {
        this.setState({navigation: Navigation.note});
        this.refNote.update(Spense.default(),Type.default());
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
                style={[localStyles.change,this.state.wallet >= 0?{color:Color.DarkGreen}:{color:Color.Red}]}>
                {/* {params.changeTitle} */}
                {Typeface.toCase({
                    text: this.state.wallet + ' đ',
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

    listCard () {
        let localStyles = substyles.body;
        if (this.state.dayList.length === 0){
            return (
                <Text style={localStyles.cardDefaultList}>
                    {params.defaultListCard}
                </Text>
            );
        } 
        return (
            <FlatList 
            style={styles.body}
            showsVerticalScrollIndicator={false}
            data={this.state.dayList.length === 0?
                    Day.default():
                    this.state.dayList}
            renderItem={({item}) => {
                return (
                <Card 
                    // style={{flex: 1}}
                    key = {item.dayID + item.total}
                    dayID = {item.dayID}
                    total = {item.total}
                    typeList = {item.typeList}
                    onClick = {this.onCardClick}
                />
            )}}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            refreshing = {this.state.refreshing}
            onRefresh={this.onRefresh}
            keyExtractor={(item,index) => 'SpenseInDate'+index}/>
        )
    }

    body () {
        let {
        } = this.getProps();

        return this.listCard();
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
                backButtonOnClick = {this.backButtonOnClick}
                ref = {(Note) => this.refNote = Note}
            />
        )
    }

    detail () {
        let {
        } = this.getProps();
        // console.log('Home detailedTotal', JSON.stringify(this.state.detailedTotal.typeList));
        return (
            <Detail
                detailedDate = {this.state.detailedDate}
                isNavigatedToDetail = {this.state.navigation === Navigation.detail}
                navigateToNote = {this.navigateToNote}
                backButtonOnClick = {this.backButtonOnClick}
                deleteAllButtonOnClick = {this.deleteAllButtonOnClick}
                deleteSpense = {this.deleteSpense}
            />
        )
    }

    onCardClick(
        dateDetail
    ) {

        this.setState({
            detailedDate: dateDetail,
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

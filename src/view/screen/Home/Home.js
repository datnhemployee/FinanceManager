
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

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isNavigatedToNote: false,
        }

        this.navigate = this.navigate.bind(this);
        this.backButtonOnClick = this.backButtonOnClick.bind(this);
        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
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
            change = 0,
            totalOfDateList = [Total.default()],
        } = this.props;
        return {
            change,
            totalOfDateList,
        }
    }

    backButtonOnClick () {
        this.navigate();
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
            change,
        } = this.getProps();

        const localStyles = substyles.header.mid;

        return (
            <Text 
                style={localStyles.change}>
                {/* {params.changeTitle} */}
                {Typeface.toCase({
                    text: change + ' đ',
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
            totalOfDateList,
        } = this.getProps();

        return (
            <ScrollView 
                style={styles.body}
                showsVerticalScrollIndicator={false}>
                {totalOfDateList.map((y)=> 
                    y.monthlyTotal.map((m) =>
                        m.dailyTotal.map((d) => 
                            <Card 
                                // style={{flex: 1}}
                                key = {d._id + d.total}
                                dateID = {d._id}
                                total = {d.total}
                                types = {d.types}
                            />
                        )
                    )
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
        let {
            isNavigatedToNote,
        } = this.state;
        return (
            <Note 
                isNavigatedToNote= {isNavigatedToNote}
                backButtonOnClick = {this.backButtonOnClick}
                cancelButtonOnClick = {this.cancelButtonOnClick}/>
        )
    }

    render() {
        let {
            isNavigatedToNote,
        } = this.state;
        return (
            <View 
            style={styles.container}
            // behavior='padding'
            >
                {this.note()}
                <Modal 
                    transparent={false}
                    visible={!isNavigatedToNote}
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

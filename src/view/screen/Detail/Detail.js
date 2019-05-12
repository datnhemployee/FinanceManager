import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ViewPagerAndroid,
  ToastAndroid
} from "react-native";
import styles, { substyles } from "./Detail.style";
import params from "./Detail.default";
import { format, getDatesFromID } from "../../../utils/DateConvert";
import Typeface from "../../../styles/Font";
import { ScrollView } from "react-native-gesture-handler";
import SpenseController from "../../../controller/SpenseController";
import Day from "../../../model/Day";
import Icon, { Size } from "../../../styles/Icon";
import Codes from "../../../constant/Codes";
import Color from "../../../styles/Color";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.deleteButtonOnClick = this.deleteButtonOnClick.bind(this);
  }

  async deleteButtonOnClick (price,id) {
    let {
      deleteSpense,
    } = this.getProps();
    let removeResult = await SpenseController.remove(id);

    if (removeResult.code === Codes.Success){

      await deleteSpense(price);
      console.log('remove success',JSON.stringify(price));

      ToastAndroid.show(`Xóa thành công chi tiêu.`,ToastAndroid.LONG);
    } else {
       console.log('remove failed',JSON.stringify(price));
       await deleteSpense(0);
      ToastAndroid.show(`Xóa thất bại chi tiêu.`,ToastAndroid.LONG);
    }
  }

  getProps() {
    let {
      detailedDate =  Day.default(),
      backButtonOnClick = () => {
        console.log(`Clicked back button`);
      },
      deleteAllButtonOnClick = () => {
        console.log(`Vừa nhấn Xóa Tất cả`);
      },
      navigateToNote = () => {
        console.log(`Vừa nhấn Thêm chi tiêu`);
      },
      deleteSpense = () => {
        console.log(`Vừa nhấn Xóa chi tiêu`);
      },
      // list = [params.defaultText]
      //   detailList = [params.detailList]
    } = this.props;

    return {
      detailedDate,
      navigateToNote,
      backButtonOnClick,
      deleteAllButtonOnClick,
      deleteSpense,
    };
  }

  navigateNoteButton() {
    let {
      navigateToNote
    } = this.getProps();
    return (
      <TouchableOpacity
        style={substyles.footer.navigateButton}
        onPress={navigateToNote}
      >
        <Text style={substyles.footer.navigateButtonText}>
          {params.btnAddText}
        </Text>
      </TouchableOpacity>
    );
  }

  deleteAllButton() {
    let { detailedDate,deleteAllButtonOnClick } = this.getProps();
    return (
      <TouchableOpacity onPress={async () => {await deleteAllButtonOnClick(
        detailedDate.dayID,
        detailedDate.total)
        }}>
        <Text style={substyles.header.deleteAllButton}>
          {params.deleteText}
        </Text>
      </TouchableOpacity>
    );
  }

  title() {
    return <Text style={substyles.header.title}>{params.title}</Text>;
  }

  backButton() {
    let { backButtonOnClick } = this.getProps();
    return (
      <TouchableOpacity
        style={substyles.header.backButton}
        onPress={() => {backButtonOnClick()}}
      >
        {params.backButtonIcon}
      </TouchableOpacity>
    );
  }

  dateLable() {
    let { detailedDate } = this.getProps();
    let {
      day,
      month,
      year,
    } = getDatesFromID(detailedDate);
    return (<Text style={substyles.body.top.dateLabel}>
      { 
        Typeface.toCase(format(
          0,
          day,
          month,
          year,),
          Typeface.type.overline)
      }
      </Text>);
  }

  detailElement(expenseName, amount, id) {
    return (
      <ViewPagerAndroid 
        key = {expenseName + amount}
        style={substyles.body.container} 
        initialPage={0}>
        <View
          style={substyles.body.container}
          key={expenseName}>
          <Text style={substyles.body.containerText}>{expenseName}</Text>
          <Text style={substyles.body.containerText}>{amount}</Text>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity
            style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
            key={expenseName + 1}
            onPress={async () => { await this.deleteButtonOnClick(amount,id)}}>
            {Icon.Remove(Size.large)}
            <Text style={{...Typeface.button,color: Color.Red}}>XÓA</Text>
          </TouchableOpacity>
        </View>
      </ViewPagerAndroid> 
    );
  }

  detailList() {
    let {
      detailedDate,
    } = this.getProps();
    return (
      <View>
        {detailedDate.typeList.map((type) => (
          <View key={type.name}>
            {type.spenseList.map(
              (spense)=>this.detailElement(
                spense.name,
                spense.price,
                spense._id))} 
          </View>
        ))}
      </View>
    );
  }

  leftHeader() {
    return this.backButton();
  }
  midHeader() {
    return this.title();
  }
  rightHeader() {
    return this.deleteAllButton();
  }

  topBody() {
    return this.dateLable();
  }
  midBody() {
    return this.detailList();
  }

  header() {
    return (
      <View style={styles.header}>
        {this.leftHeader()}
        {this.midHeader()}
        {this.rightHeader()}
      </View>
    );
  }

  body() {
    let {} = this.getProps();

    return (
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {this.topBody()}
        {this.midBody()}
      </ScrollView>
    );
  }

  footer() {
    return <View style={styles.footer}>{this.navigateNoteButton()}</View>;
  }

  render() {
    let { isNavigatedToDetail } = this.getProps();
    return (
      <Modal
        transparent={false}
        visible={isNavigatedToDetail}
        animationType="slide"
      >
        <View style={styles.container}>
          {this.header()}
          {this.body()}
          {this.footer()}
        </View>
      </Modal>
    );
  }
}

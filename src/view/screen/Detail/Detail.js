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
import DetailSpense from "../DetailSpense/DetailSpense";

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
      // console.log('remove success',JSON.stringify(price));

      ToastAndroid.show(`Xóa thành công chi tiêu.`,ToastAndroid.LONG);
    } else {
      //  console.log('remove failed',JSON.stringify(price));
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
      navigateToDetailSpense = () => {
        console.log(`Vừa nhấn Chi tiết chi tiêu`);
      }
      // list = [params.defaultText]
      //   detailList = [params.detailList]
    } = this.props;

    return {
      detailedDate,
      navigateToNote,
      backButtonOnClick,
      deleteAllButtonOnClick,
      deleteSpense,
      navigateToDetailSpense,
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
      <TouchableOpacity 
        style = {{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={async () => {await deleteAllButtonOnClick(
          detailedDate.dayID,
          detailedDate.total)
        }}>
        {Icon.Remove(Size.intermediate,Color.Red)}
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
    let {
      navigateToDetailSpense,
    } = this.getProps();
    return (
      <ViewPagerAndroid 
            style={{flex: 1}} 
            initialPage={0}
            key = {expenseName + amount}
            style={substyles.body.container}>
            <View
              style={{
                flex:1, 
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                backgroundColor: Color.White,
                elevation: 3,
                }}
              key={expenseName }>
              <TouchableOpacity 
               style={{
                flex:1, 
                flexDirection: "row",
                justifyContent: "space-between",
                }}
                onPress={() => {navigateToDetailSpense(id)}}>
                <Text style={substyles.body.containerText}>{expenseName}</Text>
                <Text style={substyles.body.containerText}>{amount}</Text>
              </TouchableOpacity>
            </View>
          <View style={{flex:1}}>
            <TouchableOpacity
              style={{
                flex:1, 
                justifyContent: 'center',
                alignItems: 'center', 
                flexDirection: 'row',
                backgroundColor: Color.Red,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                elevation: 3,
                }}
              key={expenseName + 1}
              onPress={async () => { await this.deleteButtonOnClick(amount,id)}}>
              {Icon.Remove(Size.large,Color.White)}
              <Text style={{...Typeface.button,color: Color.White}}>XÓA</Text>
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
              (spense)=>{
                return this.detailElement(
                  spense.name,
                  spense.price,
                  spense._id)}
            )} 
          </View>
        ))}
      </View>
    );
  }

  get detailSpense () {
    return (
    <DetailSpense 
      style={{flex: 1}}
    />)
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

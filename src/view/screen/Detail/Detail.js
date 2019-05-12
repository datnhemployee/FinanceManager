import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView
} from "react-native";
import styles, { substyles } from "./Detail.style";
import params from "./Detail.default";
import { format, getDatesFromID } from "../../../utils/DateConvert";
import Typeface from "../../../styles/Font";
import { ScrollView } from "react-native-gesture-handler";
import SpenseController from "../../../controller/SpenseController";
import Day from "../../../model/Day";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      // list = [params.defaultText]
      //   detailList = [params.detailList]
    } = this.props;
    return {
      detailedDate,
      navigateToNote,
      backButtonOnClick,
      deleteAllButtonOnClick
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

  detailElement(expenseName, amount, index) {
    return (
      <View style={substyles.body.container} key={index}>
        <Text style={substyles.body.containerText}>{expenseName}</Text>
        <Text style={substyles.body.containerText}>{amount}</Text>
      </View>
    );
  }

  detailList() {
    let { detailedDate } = this.getProps();
    return (
      <View>
        {detailedDate.typeList.map((type) => (
          <View >
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

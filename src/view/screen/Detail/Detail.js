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
import { format } from "../../../utils/DateConvert";
import Type from "../../../model/Type";
import FirstLetterIcon from "../../component/FirstLetterIcon/FirstLetterIcon";
import Typeface from "../../../styles/Font";
import Color from "../../../styles/Color";
import { ScrollView } from "react-native-gesture-handler";
import Note from "../Note/Note";
import Total from "../../../model/Total";
import Card from "../../component/Card/Card";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.navigate = this.navigate.bind(this);
  }
  navigate() {
    ///Bug: code điều hướng trang khi nhấn "Thêm thu chi"
  }

  getProps() {
    let {
      dateLabel = [params.dateLableText],
      detailList = [...[], ...params.detailList],
      backButtonOnClick = () => {
        console.log(`Vừa nhấn trở lại`);
      },
      deleteAllButtonOnClick = () => {
        console.log(`Vừa nhấn Xóa Tất cả`);
      }

      // list = [params.defaultText]
      //   detailList = [params.detailList]
    } = this.props;
    return {
      dateLabel,
      detailList,
      backButtonOnClick,
      deleteAllButtonOnClick
    };
  }

  navigateNoteButton() {
    return (
      <TouchableOpacity
        style={substyles.footer.navigateButton}
        onPress={this.navigate}
      >
        <Text style={substyles.footer.navigateButtonText}>
          {params.btnAddText}
        </Text>
      </TouchableOpacity>
    );
  }

  deleteAllButton() {
    let { deleteAllButtonOnClick } = this.getProps();
    return (
      <TouchableOpacity onPress={deleteAllButtonOnClick}>
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
        onPress={backButtonOnClick}
      >
        {params.backButtonIcon}
      </TouchableOpacity>
    );
  }

  dateLable() {
    let { dateLabel } = this.getProps();
    return <Text style={substyles.body.top.dateLabel}>{dateLabel}</Text>;
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
    let { detailList } = this.getProps();
    return (
      <View>
        {detailList.map((element, index) => {
          return this.detailElement(element.expenseName, element.amount, index);
        })}
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
    let { isNavigatedToDetail } = this.getProps;
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

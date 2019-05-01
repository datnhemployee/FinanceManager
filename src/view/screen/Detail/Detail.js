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
  }

  getProps() {
    let { list = [params.defaultText] } = this.props;
    return {
      list
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

  deleteButton() {
    let { deleteButtonOnClick } = this.getProps();
    return (
      <TouchableOpacity
        style={substyles.header.deleteButton}
        onPress={deleteButtonOnClick}
      >
        <Text style={substyles.header.deleteText}>{params.deleteText}</Text>
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

  leftHeader() {
    return this.backButton();
  }
  midHeader() {
    return this.title();
  }
  rightHeader() {
    return this.deleteButton();
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
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false} />
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

import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles, { substyles } from "./DetailSpense.style";
import SpenseController from "../../../controller/SpenseController";
import FirstLetterIcon from "../../component/FirstLetterIcon/FirstLetterIcon";
import TypeController from "../../../controller/TypeController";
import { getDatesFromID } from "../../../utils/DateConvert";
import Codes from "../../../constant/Codes";
import Spense from "../../../model/Spense";
import Type from "../../../model/Type";
import Typeface from "../../../styles/Font";
import Icon, { Size } from "../../../styles/Icon";
import Color from "../../../styles/Color";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renew = this.renew.bind(this);
  }

  get actions () {
    let {
      backButtonOnClick = () => {
        console.log(` Vừa nhấn qua màn hình chi tiết.`)
      }
    } = this.props;
    return {
      backButtonOnClick,
    }
  }

  get dependencies () {
    let {
      id,
      visible,
      detailedDate,
    }= this.props;
    return {
      id,
      visible,
      detailedDate,
    }
  }

  async renew () {
    let {
      id,
    } = this.dependencies;
    // try {
      let spense = await SpenseController.get(id);
      if (spense.code !== Codes.Success) {
        spense = {
          content: Spense.default(),
        }
      }
      console.log(`spense detail: `,JSON.stringify(spense));

      let type = await TypeController.getByName(spense.content.type);
      console.log(`spense detail: `,JSON.stringify(type));
      if (type.code !== Codes.Success) {
        type = {
          content: Type.default(),
        }
      }
      this.setState({
        spense: {
          ...spense.content
        },
        type: {
          ...type.content,
        }
      })
    // } catch (getException) {
    //   console.log(`Lấy thông tin chi tiêu bị lỗi.`,JSON.stringify(getException))
    //   return;
    // }
    
  }

  get empty () {
    return (<View/>)
  }

  get icon () {
    let type = this.state.type;
    if (!this.state.type)
      return this.empty;
    return (
    <View style={{
      flex: 1,
      backgroundColor: type.color,
      height: 200,
    }}>
      <FirstLetterIcon 
        firstLetter = {type.name[0]}
        color = {type.color}
      />
    </View>)
  }

  get button () {
    let {
      backButtonOnClick,
    } = this.actions;
    let {
      detailedDate,
    } = this.dependencies;
    return {
      back: (
      <TouchableOpacity 
        style= {{
          height: Size.intermediate * 2,
          justifyContent: 'center',
        }}
        onPress = {() => {backButtonOnClick(detailedDate)}}>
        {Icon.Left({
          size: Size.intermediate,
          color: Color.Gray}
        )}
      </TouchableOpacity>)
    }
  }
  get body () {
    if (!this.state.spense)
      return this.empty;

    let spense = this.state.spense;
    let date = getDatesFromID(spense.dayID);
    let dateLabel = ` Ngày `
      + date.day
      +` Tháng `
      + (date.month + 1)
      +` năm `
      + date.year;

    return (
      <View 
        style={styles.body}>
          {this.icon}
          <Text style={{
            // flex: 0.5,
            ...Typeface.overline,
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 10,
          }}>{dateLabel}</Text>
          <Text style={{
            // flex: 0.5,
            ...Typeface.overline,
             textAlign: 'left',
             textAlignVertical: 'bottom',
            padding: 10,
          }}>{Typeface.toCase({
            text: spense.type,
            type: Typeface.type.overline,
          })}</Text>
          <Text style={{
            // flex: 1,
            ...Typeface.header[3],
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Color.Black,
            padding: 10,
          }}>{spense.name}</Text>
          <Text style={{
            ...Typeface.body[1],
            // flex: 0.5,
            textAlign: 'left',
            textAlignVertical: 'bottom',
            padding: 10,
            // color: Color.Black,
          }}>Thành tiền:</Text>
          <Text style={{
            // flex: 1,
            ...Typeface.header[5],
            textAlign: 'left',
            textAlignVertical: 'top',
            color: Color.Black,
            padding: 10,
          }}>{spense.price} 000</Text>
          <Text style={{
            ...Typeface.body[1],
            // flex: 0.5,
            textAlign: 'left',
            textAlignVertical: 'bottom',
            padding: 10,
            // color: Color.Black,
          }}>Mô tả: </Text>
          <Text style={{
            ...Typeface.body[2],
            // flex: 1,
            textAlign: 'left',
            textAlignVertical: 'center',
            padding: 10,
            color: Color.Black,
          }}>{spense.description}</Text>
          
      </View>
    )
  }

  render() {
    let { visible } = this.dependencies;
    return (
      <Modal
        transparent={false}
        visible={visible}
        animationType="slide"
        onShow = {async () => {await this.renew()}}
      >
        <ScrollView 
          style={styles.container}>
          {this.button.back}
          {this.body}
        </ScrollView>
      </Modal>
    );
  }
}

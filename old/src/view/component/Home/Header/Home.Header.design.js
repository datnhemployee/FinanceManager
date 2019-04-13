import React, { Component } from "react";
import { View, Text } from "react-native";
import Name from "./Home.Header.design.interface";
import styles from "./Home.Header.style";
import Icon, { Size } from "../../../../styles/Icon";
// import Combobox from "react-widgets/lib/Combobox";

const defaultProps = {
  filter: Icon.Filter(Size.intermediate),
  left: Icon.Left(Size.intermediate),
  right: Icon.Right(Size.intermediate),
  balance: "3250000",
  expense: "300000",
  income: "60000",
  date: "Hôm nay",
  details: [],
  currency: "VNĐ",
  constant: {
    balanceLabel: "Tổng dư:",
    filter: ["Tháng", "Tuần", "Ngày", "Năm"]
  }
};

/**
 * @description The `List_V1` is used at present
 * @tag `author` just be changed by the author
 */
const List_V1 = {
  version: 0.1,
  colaborators: ["Huyen"],
  date: new Date(2019, 3, 9),
  [Name.renderLeftComponent]: () => {
    return <View style={styles.left}>{defaultProps.left}</View>;
  },
  [Name.renderRightComponent]: () => {
    return <View style={styles.right}>{defaultProps.right}</View>;
  },
  [Name.renderMidComponent]: ({
    date = defaultProps.date,
    remainder = defaultProps.remainder
  } = {}) => {
    return (
      <View style={styles.header_2}>
        <Text style={styles.date}>{date}</Text>
      </View>
    );
  },
  [Name.renderBalanceTitle]: (
    balanceLabel = defaultProps.constant.balanceLabel
  ) => {
    return <Text style={styles.balanceLabel}>{balanceLabel}</Text>;
  },
  [Name.renderFilter]: ({ filter = defaultProps.constant.filter } = {}) => {
    // return <Combobox data={filterData} defaultValue={"Tháng"} />;
    return <Text style={styles.filter}>{filter[0]}</Text>;
  },
  [Name.renderBalance]: ({
    balance = defaultProps.balance,
    currency = defaultProps.currency
  } = {}) => {
    return (
      <View style={styles.balance_component}>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.currency}>{currency}</Text>
      </View>
    );
  }
};

List_V1[Name.render] = ({
  balanceLabel,
  currency,
  filter,
  balance,
  date
} = {}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header_1}>
        {List_V1[Name.renderBalanceTitle](balanceLabel)}
        {List_V1[Name.renderFilter](filter)}
      </View>
      {List_V1[Name.renderBalance]({ balance, currency })}
      <View style={styles.header_2}>
        {List_V1[Name.renderLeftComponent]()}
        {List_V1[Name.renderMidComponent](date)}
        {List_V1[Name.renderRightComponent]()}
      </View>
    </View>
  );
};

// **Note: To release new version of the functions
// Adding new version of the functions shall satisfy the rules below:
//  + Same name: when the version of the new one is from the (version + 0.1) to (version + 0.9)
//  + name[V + 1]: when the version of the new one is more than version + 1)

/**
 * @description The `FunctionNameList` is used at present
 * @tag `Changable`
 */
const List = {
  ...{
    render: List_V1[Name.render].bind(List_V1)
  },
  //  the next release version should be added here ...
  ...{
    // **Note: Update new name of the functions here until a new version releases.
  }
};

// console.log('List',JSON.stringify(List[Name.renderTitle])) undefined
// console.log('List_f',JSON.stringify(List[Name.renderTitle]())) function

/**
 * @function render
 */
export default List.render;
export { Name, List };

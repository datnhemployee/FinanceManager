import { StyleSheet, Picker, View, Text } from "react-native";
import { FontSize } from "../../../../styles/Font";
import Color from "../../../../styles/Color";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.Green
  },
  header_1: {
    flex: 1,
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  header_2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    borderWidth: 1,
    marginLeft: 5
  },
  right: {
    borderWidth: 1,
    marginRight: 5
  },
  date: {
    flex: 1,
    textAlign: "center",
    //borderWidth: 1,
    // width: "match-parent",
    fontSize: FontSize.intermediate,
    // fontWeight: "bold",
    color: Color.White
  },
  balance_component: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    fontSize: FontSize.small,
    color: Color.White
  },
  // total_currency: {
  //   flex: 1,
  //   flexDirection: "row"
  // },
  balanceLabel: {
    flex: 1,
    color: Color.White
  },
  currency: {
    flex: 1,
    color: Color.White,
    paddingLeft: 3,
    fontSize: FontSize.intermediate
  },
  filter: {
    fontSize: FontSize.small,
    color: Color.White,
    alignSelf: "flex-end"
  },
  balance: {
    alignSelf: "flex-start",
    color: Color.White,
    fontSize: FontSize.intermediate,
    fontWeight: "bold"
  }
});

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
    marginLeft: 5
  },
  right: {
    marginRight: 5
  },
  date: {
    flex: 1,
    textAlign: "center",
    fontSize: FontSize.intermediate,
    color: Color.White
  },
  balance_component: {
    flex: 1,
    flexDirection: "row",
    fontSize: FontSize.small,
    color: Color.White
  },
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

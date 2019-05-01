import { StyleSheet, Dimensions } from "react-native";
import Typeface from "../../../styles/Font";
import Color from "../../../../old/src/styles/Color";
import ConstantValue from "../../../constant/ConstantValue";

let { width, height } = Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
  container: {
    // borderWidth: 1,
    padding: 10,
    height: height
    // flex: 1,
    // elevation: 3,
  },
  header: {
    // flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderBottomColor: Color.Gray,
    height: height / 10
    // borderWidth: 1,
    // borderWidth: 1,
  },
  body: {
    // flex: 8,
    height: (5 * height) / 10
    // borderWidth: 1,
  },
  footer: {
    // flex: 1,
    height: (1 * height) / 10,
    borderTopWidth: 1,
    borderTopColor: Color.Gray
    // borderWidth: 1,
    // borderRadius: 10,
  }
});

export const substyles = {
  header: {
    top: {
      changeTitle: {
        ...Typeface.header[5],
        textAlign: "center",
        textAlignVertical: "center"
        // color: Color.Black,
        // borderWidth: 1,
      }
    },
    mid: {
      change: {
        ...Typeface.header[3],
        textAlign: "center",
        textAlignVertical: "center",
        color: Color.DarkGreen
      }
    }
  },
  body: {
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    top: {
      dateLabel: {
        // flex: 1,
        // borderWidth: 1,
        height: 40,
        ...Typeface.overline,
        textAlign: "center",
        textAlignVertical: "center"
      }
    }
  },
  footer: {
    navigateButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    navigateButtonText: {
      flex: 1,
      ...Typeface.button,
      textAlign: "center",
      textAlignVertical: "center",
      color: Color.Black,
      width: (width * 2) / 3,
      backgroundColor: Color.LightGray,
      margin: 10,
      borderRadius: 50
    }
  }
};

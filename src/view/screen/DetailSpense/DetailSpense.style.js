import { StyleSheet, Dimensions } from "react-native";
import Typeface from "../../../styles/Font";
import Color from "../../../styles/Color";

let { width, height } = Dimensions.get("window");
height = height - 30;

export default StyleSheet.create({
  container: {
    // borderWidth: 1,
    // flex: 1,
    backgroundColor: Color.White,
    // flex: 1,
    
  },
  header: {
    // flex: 1,
    flexDirection: "row",
    // borderBottomWidth: 1,
    justifyContent: "space-between",
    // borderBottomColor: Color.Gray,
    height: height / 10
  },
  body: {
    // height: height,
    // margin: 10,
    // height: (5 * height) / 10,
    // borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Color.White,
    // elevation: 3,
  },
  footer: {
    height: (1 * height) / 10,
    // borderTopWidth: 1,
    // borderTopColor: Color.Gray
  }
});

export const substyles = {
  header: {
    title: {
      flex: 2,
      ...Typeface.header[6],
      textAlignVertical: "center",
      textAlign: 'left'
    },
    backButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteAllButton: {
      flex: 1,
      ...Typeface.button,
      color: Color.Red,
      textAlignVertical: "center",
      textAlign: 'left',
    }
  },
  body: {
    container: {
      height: 60,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
      // borderRadius: 10,

      borderBottomWidth: 1,
      borderColor: Color.LightGray,
    },
    containerText: {
      ...Typeface.body[1],
      textAlign: 'center',
      textAlignVertical: 'center',
      margin: 10,
      // fontSize: 30
    },
    top: {
      dateLabel: {
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
      ...Typeface.body[1],
      textAlign: "center",
      textAlignVertical: "center",
      // color: Color.Black,
      width: (width * 2) / 3,
      backgroundColor: Color.LightGray,
      margin: 10,
      borderRadius: 50
    }
  }
};

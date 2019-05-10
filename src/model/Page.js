import { AsyncStorage } from "react-native";
import Type from "./Type";
import ConstantValue from "../constant/ConstantValue";
import Color from "../styles/Color";
import { gap } from "../utils/DateConvert";

// const INIT_NUMBER = ConstantValue.INIT_NUMBER;
export default class Page {
  constructor() {}

  static async default() {
    return {
      pageIndex: 0,
      amount: 0,
      dayList: [{
        Id: dayID,
        total: 0,
        typeList: [
            {
                Id: 0,
                total: 0,
                spenseList: []
            }
        ]
    }]
    };
  }
}

import { AsyncStorage } from "react-native";
import Type from "./Type";
import IDGenerater from "./IDGenerater";
import ConstantValue from "../constant/ConstantValue";
import Color from "../styles/Color";
import { gap } from "../utils/DateConvert";

const INIT_NUMBER = ConstantValue.INIT_NUMBER;
export default class Spense{
    constructor () {}

    static async default () {
        return {
            _id: await IDGenerater.getNextID(IDGenerater.nextID_Spense),
            name: `Không tên`,
            description: `Không`,
            typeID : INIT_NUMBER,
            price : 0,
            dayID : gap().date(),
        }
    }

   
}



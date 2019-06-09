import { AsyncStorage } from "react-native";
import ConstantValue from "../constant/ConstantValue";
import { getID } from "../utils/DateConvert";

const INIT_NUMBER = ConstantValue.INIT_NUMBER;
export default class Spense{
    constructor () {}

    static default (dayID = getID().day()) {
        return {
            name: `Rỗng`,
            description: `Rỗng`,
            type : `Rỗng`,
            price : 0,
            dayID : dayID,
        }
    }

   
}



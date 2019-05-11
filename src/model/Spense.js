import { AsyncStorage } from "react-native";
import ConstantValue from "../constant/ConstantValue";
import { getID } from "../utils/DateConvert";

const INIT_NUMBER = ConstantValue.INIT_NUMBER;
export default class Spense{
    constructor () {}

    static async default (dayID = getID().day()) {
        return {
            name: ``,
            description: ``,
            type : ``,
            price : 0,
            dayID : dayID,
        }
    }

   
}



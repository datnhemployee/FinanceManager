import ConstantValue from "../constant/ConstantValue";
import IDGenerater from "./IDGenerater";
import Color from "../styles/Color";

export default class Type {
    constructor () {
    }

    static default () {
        return {
            _id: ConstantValue.INIT_NUMBER,
            name: `Không tên`,
            isIncome: false,
            color: Color.Gray,
        }
    }
}
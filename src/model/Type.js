import ConstantValue from "../constant/ConstantValue";
import Color from "../styles/Color";

export default class Type {
    constructor () {
    }

    static default () {
        return {
            name: `Không tên`,
            isIncome: false,
            color: Color.Gray,
        }
    }
}
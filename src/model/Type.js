import ConstantValue from "../constant/ConstantValue";
import IDGenerater from "./IDGenerater";
import Color from "../styles/Color";

export default class Type {
    constructor () {
    }

    static default () {
        return {
            _id: IDGenerater.getNextID(IDGenerater.nextID_Type),
            name: `Không tên`,
            isIncome: false,
            color: Color.Gray,
        }
    }
}
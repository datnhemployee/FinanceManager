import { format } from "../utils/DateConvert";

const ConstantValue = {
    INIT_NUMBER: 0,
    INIT_DATE: format(new Date(2019,4,3)),
    SCREEN: {
        WIDTH: 400,
        HEIGHT: 700,
    },
};
ConstantValue.SCREEN.UNIT_HEIGHT = ConstantValue.SCREEN.HEIGHT / 10
ConstantValue.SCREEN.HEADER = 1 * ConstantValue.SCREEN.UNIT_HEIGHT
ConstantValue.SCREEN.BODY = 5 * ConstantValue.SCREEN.UNIT_HEIGHT
ConstantValue.SCREEN.FOOTER = 1* ConstantValue.SCREEN.UNIT_HEIGHT

export default {
    ...ConstantValue,
}
import { format } from "../utils/DateConvert";

const ConstantValue = {
    INIT_NUMBER: 0,
    INIT_DATE: format(new Date(2019,4,3)),
    SCEEN: {
        WIDTH: 400,
        HEIGHT: 700,
    },
};
ConstantValue.SCREEN.UNIT_HEIGHT = ConstantValue.SCEEN.HEIGHT / 10
ConstantValue.SCEEN.HEADER = 1 * ConstantValue.SCREEN.UNIT_HEIGHT
ConstantValue.SCEEN.BODY = 5 * ConstantValue.SCREEN.UNIT_HEIGHT
ConstantValue.SCEEN.FOOTER = 1* ConstantValue.SCREEN.UNIT_HEIGHT

export default {
    ...ConstantValue,
}
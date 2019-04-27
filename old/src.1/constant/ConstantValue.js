import { format } from "../utils/DateConvert";

const ConstantValue = {
    INIT_NUMBER: 0,
    INIT_DATE: format(new Date(2019,4,3)),
    DEFAULT_DATE: new Date(2019,4,14),
};

export default {
    ...ConstantValue,
}
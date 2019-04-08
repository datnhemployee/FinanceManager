import { format } from "../utils/DateConvert";

const ConstantValue = {
    INIT_NUMBER: 0,
    INIT_DATE: format(new Date(2019,4,3))
};

export default {
    ...ConstantValue,
}
import Typeface from "../../../styles/Font";
import Type from "../../../model/Type";
import { gap } from "../../../utils/DateConvert";

export default {
    defaultDateID: gap().day(),
    defaultTotal: 0,
    defaultType: [
        {
            ...Type.default(),
            total: 0,
            spenseList: [{

            }]
        },
    ],
    spentLabel: Typeface.toCase({
        text: 'Đã chi trong ngày',
        type: Typeface.type.overline,
    })
}
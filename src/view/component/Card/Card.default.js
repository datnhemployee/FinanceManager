import Typeface from "../../../styles/Font";
import Type from "../../../model/Type";
import { getID } from "../../../utils/DateConvert";

export default {
    defaultDateID: getID().day(),
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
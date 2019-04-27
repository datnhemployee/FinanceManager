import Typeface from "../../../styles/Font";

export default {
    left: {
        label: Typeface.toCase({
            text: 'Số dư',
            type: Typeface.type.default,
        }),
        text: 0
    },
    spent: {
        label: Typeface.toCase({
            text: 'Đã chi trong ngày',
            type: Typeface.type.default,
        }),
        text: 0
    },
}
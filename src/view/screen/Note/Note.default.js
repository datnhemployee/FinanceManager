import { format } from '../../../utils/DateConvert';
import Icon, { Size } from '../../../../old/src/styles/Icon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';

const present = new Date();
const day = present.getDate();
const month = present.getMonth() + 1;
const year = present.getFullYear();

export default params = {
    title: Typeface.toCase({
        text: `Thêm chi tiêu`,
        type: Typeface.type.default,
    }),
    backButtonIcon: Icon.Left({
        size: Size.intermediate,
        color:Color.Gray}),
    cancelText: Typeface.toCase({
        text: `hủy`,
        type: Typeface.type.button,
    }),
    typeLabelText: Typeface.toCase({
        text: Typeface.toCase({
            text: 'Loại giao dịch',
            type: Typeface.type.default,
        }),
        type: Typeface.type.default,
    }),
    dateLableText: Typeface.toCase({
        text: format({day: day,month: month, year: year}),
        type: Typeface.type.overline,
    }),
    placeholder: {
        inputName: Typeface.toCase({
            text: 'Tên giao dịch ?',
            type: Typeface.type.default,
        }),
        inputPrice: Typeface.toCase({
            text: 'Số tiền ?',
            type: Typeface.type.default,
        }),
        inputDescription: Typeface.toCase({
            text: 'Ghi chú ?',
            type: Typeface.type.default,
        }),
    },
    editIcon: Icon.Edit({}),
    income: Typeface.toCase({
        text: 'Thu',
        type: Typeface.type.default,
    }),
    outcome: Typeface.toCase({
        text: 'Chi',
        type: Typeface.type.default,
    }),
    saveButtonText: Typeface.toCase({
        text: 'Lưu',
        type: Typeface.type.button,
    }),
}
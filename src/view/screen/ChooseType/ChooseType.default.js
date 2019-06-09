import Typeface from '../../../styles/Font';
import Icon, { Size } from '../../../../src/styles/Icon';
import Color from '../../../styles/Color';

export default params = {
    createNewText: Typeface.toCase({
        text: 'Thêm loại chi tiêu...',
        type: Typeface.type.default,
    }),
    title: Typeface.toCase({
        text: `Loại Chi tiêu`,
        type: Typeface.type.default,
    }),
    cancelText: Typeface.toCase({
        text: `Hủy`,
        type: Typeface.type.button,
    }),
    backButtonIcon: Icon.Left({
        size: Size.intermediate,
        color: Color.Gray
    }),
    placeholder: {
        inputName: Typeface.toCase({
            text: 'Tên loại giao dịch ?',
            type: Typeface.type.default,
        }),
    },
}
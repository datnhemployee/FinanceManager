import Typeface from '../../../styles/Font';
import Icon, { Size } from '../../../../src/styles/Icon';
import Color from '../../../styles/Color';

export default params = {
    saveButtonText: Typeface.toCase({
        text: 'Lưu',
        type: Typeface.type.button,
    }),
    title: Typeface.toCase({
        text: `Loại giao dịch`,
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
            text: 'Tên...',
            type: Typeface.type.default,
        }),
    },
}
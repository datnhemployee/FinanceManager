import { format } from '../../../utils/DateConvert';
import Icon, { Size } from '../../../../old/src/styles/Icon';
import Typeface from '../../../styles/Font';
import Color from '../../../styles/Color';


export default params = {
    changeTitle: Typeface.toCase({
        text: 'Số dư',
        type: Typeface.type.overline,
    }),
    navigateButtonText: Typeface.toCase({
        text: 'Thêm thu chi hôm nay',
        type: Typeface.type.default,
    }),
}
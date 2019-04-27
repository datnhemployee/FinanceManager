import { format } from '../../../utils/DateConvert';
import Icon from '../../../../old/src/styles/Icon';
import Typeface from '../../../styles/Font';

export default {
    dateText: Typeface.toCase({
        text: format({
            day: 3,
            month: 4,
            year: 2019,
        }),
        type: Typeface.type.overline,
    }),
    notificationText: Typeface.toCase({
        text: 'Mua cây đường',
        type: Typeface.type.default,
    }),
    imageIcon: Icon.Picture(),
    sendIcon: Icon.Send(),
}
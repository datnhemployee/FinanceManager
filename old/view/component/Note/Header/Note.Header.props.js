import Constant from '../../../../constant/ConstantValue'
import Icon from '../../../../styles/Icon';
import Typeface from '../../../../styles/Font';
import Color from '../../../../styles/Color';

const {
    INIT_NUMBER,
    INIT_DATE,
} = Constant;

export default {
    exspenseValue: INIT_NUMBER,
    exspenseText: Typeface.toCase({text: 'Tổng chi',type: Typeface.type.default}),
    confirmButtonText: Typeface.toCase({text: 'Lưu sổ',type: Typeface.type.button}),
    iconMore: Icon.Left({color:Color.DarkGreen}),
    date: INIT_DATE,
    confirmButton_Click: () => console.log('Vừa nhấn lưu sổ'),
    moreIconButton_Click: () => console.log('Vừa nhấn thêm chức năng'),
    navigationDetail_Click: () => console.log('Vừa nhấn \" Chi tiết \"'),
    navigationBill_Click: () => console.log('Vừa nhấn \" Hóa đơn \"'),
}
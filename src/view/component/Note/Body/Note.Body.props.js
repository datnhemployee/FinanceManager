import ConstantValue from "../../../../constant/ConstantValue";
// import FormBill from "../../../form/Bill/Form.Bill";
// import FormNote from "../../../form/Note/Form.Note";
import { navigationIDs } from "../Header/Note.Header.render";

export default {
    dateText: ConstantValue.INIT_DATE,
    defaultNavigate: navigationIDs.default - 1,
    detailNavigate: `${navigationIDs.detail}`,
    billNavigate: `${navigationIDs.bill}`,
    onPageSelected: (e) => console.log(`bạn vừa chọn trang ${e.nativeEvent.position}`)
    // billForm: FormBill,  
    // noteForm: FormNote,
}
import { format } from "../../../utils/DateConvert";
import Icon, { Size } from "../../../../src/styles/Icon";
import Typeface from "../../../styles/Font";
import Color from "../../../styles/Color";
///Bug: Gọi hàm lấy ngày
const present = new Date();
const day = present.getDate();
const month = present.getMonth() + 1;
const year = present.getFullYear();
///Bug: Gọi hàm lấy danh sách chi tiêu trong ngày đó
// const detailList = [
//   { expenseName: "Trứng gà", amount: 3000 },
//   { expenseName: "Cơm hộp", amount: 20000 },
//   { expenseName: "Kem", amount: 8000 },
//   { expenseName: "Bánh cốm", amount: 15000 }
// ];
export default params = {
  // detailList,
  defaultDate: Typeface.toCase({
    text: format({ day: 5, month: 4, year: 2019 }),
    type: Typeface.type.default
  }),
  title: Typeface.toCase({
    text: "Chi tiết",
    type: Typeface.type.default
  }),
  defaultText: Typeface.toCase({
    text: "Trống",
    type: Typeface.type.default
  }),
  btnAddText: Typeface.toCase({
    text: "Thêm thu chi hôm nay",
    type: Typeface.type.button
  }),
  deleteText: Typeface.toCase({
    text: "Xóa tất cả",
    type: Typeface.type.button
  }),
  backButtonIcon: Icon.Left({
    size: Size.intermediate,
    color: Color.Gray
  }),
  dateLableText: Typeface.toCase({
    text: format({ day: day, month: month, year: year }),
    type: Typeface.type.overline
  })
};

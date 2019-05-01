import { format } from "../../../utils/DateConvert";
import Icon, { Size } from "../../../../old/src/styles/Icon";
import Typeface from "../../../styles/Font";
import Color from "../../../styles/Color";

export default (params = {
  defaultDate: Typeface.toCase({
    text: format({ day: 5, month: 4, year: 2019 }),
    type: Typeface.type.default
  }),
  title: Typeface.toCase({
    text: "Chi tiết",
    type: Typeface.type.overline
  }),
  defaultText: Typeface.toCase({
    text: "Trống",
    type: Typeface.type.default
  }),
  btnAddText: Typeface.toCase({
    text: "Thêm thu chi",
    type: Typeface.type.button
  }),
  deleteText: Typeface.toCase({
    text: "Xóa tất cả",
    type: Typeface.type.button
  }),
  backButtonIcon: Icon.Left({
    size: Size.intermediate,
    color: Color.Gray
  })
});

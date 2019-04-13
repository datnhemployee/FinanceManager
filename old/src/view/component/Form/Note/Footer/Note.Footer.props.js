import Icon from "../../../../styles/Icon";
import ConstantValue from "../../../../constant/ConstantValue";


export default {
    firstReminder: 'Không có mục chưa chi',
    numberOfReminder: ConstantValue.INIT_NUMBER,
    pictureIcon: Icon.Picture(),
    sendIcon: Icon.Send(),
    addPictureButton_Click: () => console.log('Vừa nhấn \" Thêm ảnh \"'),
    addNoteButton_Click: () => console.log('Vừa nhấn \" Thêm mục chưa chi \"'),
    navigateButton_Click: () => console.log('Vừa nhấn \" Xem danh mục chưa chi \"'),
}
import { Alert } from "react-native";

const EXCEPTIONS = {
    
    INVALID_DATE: `Ngày tháng năm truyền vào nhỏ hơn
        ngày mặc định (5 tháng 4 năm 2019 ) `,
    UNAVAILABLE_DATE: `Ngày muốn tìm không có tại CSDL `,
}

export default {
    throw (
        message = EXCEPTIONS.DEFAULT_EXCEPTION
    ) {console.log(message);},
    ...EXCEPTIONS,
}


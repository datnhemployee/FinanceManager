import Codes from "../constant/Codes";
import TypeRepository from "../repository/TypeRepository";


export default class SpenseController {


    static async insert (type) {
        let constraint = !type ? 
        `Loại chi tiêu không đầy đủ thông tin.`: 
        !type.name ?
        `Chưa nhập tên loại chi tiêu.`:
        type.length < 4 ?
        `Tên loại chi tiêu phải trên 4 kí tự.`:
        undefined;
        
        if(!constraint){
            let result = {
            code: Codes.None,
            }
            let insertResult = await TypeRepository.insert(type);
            if (insertResult.code === Codes.Exception)
            return insertResult;

            return {
            code: Codes.Success,
            content: insertResult,
            }
        }
        return {
            code: Codes.Exception,
            content: constraint,
        }
  }

  static async update (id,update) {
    
      return {
        code: Codes.Failed,
        content: `Không thể xóa mã chi tiêu vì sẽ gây ra lỗi.`,
      }
  }

  static async remove (id) {
    
      return {
        code: Codes.Failed,
        content: `Không thể xóa mã chi tiêu vì sẽ gây ra lỗi.`,
      }
  }
}
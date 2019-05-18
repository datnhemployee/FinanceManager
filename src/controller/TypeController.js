import Codes from "../constant/Codes";
import TypeRepository from "../repository/TypeRepository";


export default class TypeController {

  static async getByName (name) {
    return await TypeRepository.find(name);
  }
  static getAll () {
    return TypeRepository.getAll();
  }
  static async isIncome (name) {
    let type = await TypeRepository.isIncome(name);
    if(type.code === Codes.Success)
      return type.content;
    return false;
  }
  static async insert (type) {
    console.log(JSON.stringify(type))
    let constraint = !type ? 
    `Loại chi tiêu không đầy đủ thông tin.`: 
    !type.name ?
    `Chưa nhập tên loại chi tiêu.`:
    type.name.length < 4 ?
    `Tên loại chi tiêu phải trên 4 kí tự.`:
    undefined;
    console.log(JSON.stringify(constraint))
    
    if(!constraint){
        
        return await TypeRepository.insert(type);
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
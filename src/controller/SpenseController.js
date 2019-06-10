import Codes from "../constant/Codes";
import SpenseRepository from "../repository/SpenseRepository";


export default class SpenseController {

  static getPage (index = 1,callback) {
    return SpenseRepository.getPage(index,callback);
  }

  static async get (id) {
    return await SpenseRepository.get(id);
  }

  static async insert (spense) {
    let constraint = !spense ? 
      `Chi tiêu không đầy đủ thông tin.`: 
      !spense.name ?
      `Chưa nhập tên chi tiêu.`:
      spense.length < 4 ?
      `Tên chi tiêu phải trên 4 kí tự.`:
      undefined;
      
      if(!constraint){
        let result = {
          code: Codes.None,
        }
        let insertResult = await SpenseRepository.insert(spense);
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
    let constraint = !id ?
      `Mã chi tiêu không thể rỗng`:
      !update ? 
      `Chi tiêu không đầy đủ thông tin.`: 
      !update.name ?
      `Chưa nhập tên chi tiêu.`:
      update.name.length < 4 ?
      `Tên chi tiêu phải trên 4 kí tự.`:
      undefined;
      
      if(!constraint){
        let result = {
          code: Codes.None,
        }
        let updateResult = await SpenseRepository.update(id,update);
        if (updateResult.code === Codes.Exception)
          return updateResult;

        return {
          code: Codes.Success,
          content: updateResult,
        }
      }
      return {
        code: Codes.Exception,
        content: constraint,
      }
  }

  static async remove (id) {
    let constraint = !id ?
      `Mã chi tiêu không thể rỗng`:
      undefined;
      
      if(!constraint){

        return await SpenseRepository.remove(id);
       
      }
      return {
        code: Codes.Exception,
        content: constraint,
      }
  }

  static async removeByDate (dayID) {
    return SpenseRepository.removeByDate(dayID);
  }
}
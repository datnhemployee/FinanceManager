import Datastore from "react-native-local-mongodb";
import Codes from "../constant/Codes";
import Day from "../model/Day";
import { getID } from "../utils/DateConvert";

const DayDatastore = new Datastore({
    filename: "Day",
    autoload: true,
})

const SpenseDatastore = new Datastore({
    filename: "Spense",
    autoload: true,
})

export default class SpenseRepository {

    static async get (id) {
        return {
            code: Codes.Success,
            content: await SpenseDatastore.findOneAsync({_id: id}),
        }
    }
    static async getPage (pageIndex = 1) {
        DayDatastore.find({})
            .skip((pageIndex-1) * 5)
            .limit(5).sort({dayID: 1})
            .exec((err,result)=> {
                if (err){
                    result = {
                        code: Codes.Exception,
                        content: `Không thể lấy dữ liệu.`,
                    }
                    return;
                }
                result = {
                    code: Codes.Success,
                    content: result,
                }
            });
        return result;
    }

    static async insert (spense) { 
        spense = await SpenseDatastore.insertAsync(spense);
        
        if(!spense) {
            return {
                code: Codes.Exception,
                content: `Lỗi hệ thống: không thể thêm mới vào cơ sở dữ liệu.`
            }
        }

        return await SpenseRepository
            .PRIVATE
            .DayRepository.insertSpense(spense);
        
    }

    static async update (id,update) {

        let resultRemove_previousSpense = 
            await SpenseRepository
            .PRIVATE
            .DayRepository.removeSpense(id);

        if (resultRemove_previousSpense.code === Codes.Exception){
            return resultRemove_previousSpense;
        }

        update = await SpenseDatastore.updateAsync({
            _id: id,
        },
        update,
        {returnUpdatedDocs: true});
        
        if(!update) {
            return {
                code: Codes.Exception,
                content: `Lỗi hệ thống: không thể cập nhật chi tiêu.`
            }
        }

        return await SpenseRepository
            .PRIVATE
            .DayRepository.insertSpense(id, update);

    }

    static async remove (id) {
        let numberAffected = await SpenseDatastore.removeAsync({_id: id});
        
        if(!numberAffected) {
            return {
                code: Codes.Exception,
                content: `Lỗi hệ thống: không thể xóa chi tiêu không tồn tại.`
            }
        }

        return await SpenseRepository
            .PRIVATE
            .DayRepository.removeSpense(id);
    }

    static get PRIVATE () {
        return {
            DayRepository: {
                async insertSpense(spense) {

                    let day = await DayDatastore.findOneAsync({
                        dayID: spense.dayID,
                    });
                    if(!day) {
                        day = Day.default(spense.dayID);
                    }
                    day.total = spense.price + day.total;
            
                    let typeIndex = day.typeList.findIndex((val)=> val.name === spense.type);
                    if(typeIndex == -1){
                        day.typeList.push({
                            name: spense.type,
                            total: spense.price,
                            spenseList: [{
                                _id: spense._id,
                                name: spense.name,
                                price: spense.price,
                            }]
                        })
                    } else {
                        day.typeList[typeIndex].total = day.typeList[typeIndex].total + spense.price;
                        day.typeList[typeIndex].spenseList.push({
                            _id: spense._id,
                            name: spense.name,
                            price: spense.price,
                        });
                    }

                    let docAffected = await DayDatastore.removeAsync({
                        dayID: spense.dayID,
                    });
                    if(docAffected == 0)
                        return {
                            code: Codes.Exception,
                            content: `Tổng kết chi tiêu tồn tại nhưng không thể cập nhật.`
                        }
                    
                    let dayFromDB = await DayDatastore.insertAsync(spense);
                    if(!!dayFromDB){
                        return {
                            code: Codes.Success,
                            content: dayFromDB,
                        }
                    }
                    return {
                        code: Codes.Exception,
                        content: `Lỗi hệ thống: không thể cập nhật tổng kết chi tiêu.`
                    };
                },
                async removeSpense (id) {

                    let spense = await SpenseDatastore.findOneAsync({_id:id});
                    if(!day) {
                        return {
                            code: Codes.Exception,
                            content: `Lỗi hệ thống: không tồn tại Mã chi tiêu tương ứng.`
                        }
                    }

                    let day = await DayDatastore.findOneAsync({
                        dayID: spense.dayID,
                    });
                    if(!day) {
                        return {
                            code: Codes.Exception,
                            content: `Lỗi hệ thống: không tồn tại tổng kết chi tiêu tương ứng.`
                        }
                    }
            
                    let typeIndex = day.typeList.findIndex((val)=> val.name === spense.type);
                    if(typeIndex == -1) {
                        return {
                            code: Codes.Exception,
                            content: `Lỗi hệ thống: không tồn tại loại chi tiêu tương ứng.`
                        }
                    }
            
                    let oldIndex = day.typeList[typeIndex].spenseList.findIndex((val)=> val._id == id);
                    if(oldIndex == -1) {
                        return {
                            code: Codes.Exception,
                            content: `Lỗi hệ thống: không tồn tại chi tiêu tương ứng trong tổng kết.`
                        }
                    }
            
                    day.total = day.total - spense.price;
                    day.typeList[typeIndex].total = day.typeList[typeIndex].total - spense.price;
                    day.typeList[typeIndex].spenseList = day.typeList[typeIndex].spenseList.filter((val)=>val._id === id);

                    let removeResult = await DayDatastore.removeAsync({dayID: spense.dayID});
                    if(removeResult === 0){
                        return {
                            code: Codes.Exception,
                            content: `Không thể thực hiện xóa chi tiêu tại tổng kết chi tiêu cũ`,
                        }
                    }
                    let insertResult = await DayDatastore.insertAsync(day);
                    if (!insertResult){
                        return {
                            code: Codes.Exception,
                            content: `Không thể thực hiện cập nhật lại tổng kết chi tiêu cũ`,
                        }
                    }
                },
            }
        }
    }
}
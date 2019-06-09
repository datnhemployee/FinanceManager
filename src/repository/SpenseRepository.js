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

    static async removeByDate(dayID) {
        await SpenseDatastore.removeAsync({dayID: dayID},{multi: true});
        let result = await DayDatastore.removeAsync({dayID: dayID},{multi: true});
        return {
            code: Codes.Success,
            content: result,
        }
    }
    static async get (id) {
        return {
            code: Codes.Success,
            content: await SpenseDatastore.findOneAsync({_id: id}),
        }
    }
    static async getAll () {
        return await SpenseDatastore.findAsync({});
    }
    static async getAllDay () {
        return await DayDatastore.findAsync({});
    }
    static async deleteAll () {
        console.log("remove day",await DayDatastore.removeAsync({dayID: 38}))
        console.log("remove spense",await SpenseDatastore.removeAsync({dayID: 38}));
    }
    static getPage (pageIndex = 1,callback) {
        let result = {
            code: Codes.None,
            content: 'Không có dữ liệu'
        }
        DayDatastore.find({})
            .sort({dayID: -1})
            .skip((pageIndex-1) * 5)
            .limit(5)
            .exec((err,rs)=> {
                callback({
                    code: Codes.Success,
                    content: rs,
                })
            });
        
    }

    static async insert (spense) { 
        spense = await SpenseDatastore.insertAsync(spense);
        // console.log('insert',spense);
        
        if(!spense) {
            return {
                code: Codes.Exception,
                content: `Lỗi hệ thống: không thể thêm mới vào cơ sở dữ liệu.`
            }
        }

        // console.log('before dayList',JSON.stringify(spense));

        let result = await SpenseRepository
            .PRIVATE
            .DayRepository.insertSpense(spense);

        // console.log(JSON.stringify(result));
        return result;
        
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

        let result = await SpenseRepository
            .PRIVATE
            .DayRepository.removeSpense(id);
        if(result.code === Codes.Success){
            let numberAffected = await SpenseDatastore.removeAsync({_id:id});
            
            if(!numberAffected) {
                return {
                    code: Codes.Exception,
                    content: `Lỗi hệ thống: không thể xóa chi tiêu không tồn tại.`
                }
            }
        }
        return result;

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
                    // console.log('day in dayList',JSON.stringify(day));

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

                    // console.log('day in dayList after typeList',JSON.stringify(day));

                    let affected = await DayDatastore.removeAsync({
                        dayID: spense.dayID,
                    });
                    // console.log('affected in dayList after remove',JSON.stringify(affected));
                    
                    
                    let dayFromDB = await DayDatastore.insertAsync(day);
                    if(!!dayFromDB){
                        return {
                            code: Codes.Success,
                            content: dayFromDB,
                        }
                    }
                    // console.log('day in dayList after inset ',JSON.stringify(await DayDatastore.findAsync({})));

                    return {
                        code: Codes.Exception,
                        content: `Lỗi hệ thống: không thể cập nhật tổng kết chi tiêu.`
                    };
                },
                async removeSpense (id) {

                    let spense = await SpenseDatastore.findOneAsync({_id:id});

                    if(!spense) {
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
                    console.log('before',JSON.stringify(day))

                    day.typeList[typeIndex].spenseList = day.typeList[typeIndex].spenseList.filter((val)=>val._id != id);
                    console.log('after',JSON.stringify(day))
                    try {
                        let removeResult = await DayDatastore.removeAsync({dayID: spense.dayID});
                        console.log('after remove',JSON.stringify(removeResult))
                        
                        if (day.total === 0) {
                            return {
                                code: Codes.Success,
                                content: ` Xóa chi tiêu thành công với việc xóa ngày. `,
                            }
                        }
                        if(removeResult === 0){
                            return {
                                code: Codes.Exception,
                                content: `Không thể thực hiện xóa chi tiêu tại tổng kết chi tiêu cũ`,
                            }
                        }

                        if (day.typeList[typeIndex].spenseList.length == 0){
                            day.typeList.filter((val) => val.spenseList.length === 0);
                        }
                        
                        let insertResult = await DayDatastore.insertAsync(day);
                        console.log('remove result: ',JSON.stringify(insertResult));
    
                        if (!insertResult){
                            return {
                                code: Codes.Exception,
                                content: `Không thể thực hiện cập nhật lại tổng kết chi tiêu cũ`,
                            }
                        }
                        return {
                            code: Codes.Success,
                            content: insertResult,
                        }
                    } catch (Exception) {
                        console.log(`Error removeAsync ${Exception}`)
                    }
                    
                },
            }
        }
    }
}
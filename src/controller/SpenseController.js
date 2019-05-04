import Datastore from "react-native-local-mongodb";
import Spense from "../model/Spense";
import { AsyncStorage } from 'react-native'
import { gap, getDatesFromID as getDateFromID } from "../utils/DateConvert";
import Total from "../model/Total";

let spenseDoc = new Datastore({
    filename: 'Spense',
    autoload: true,
})

let typeDoc = new Datastore({
    filename: 'Type',
    autoload: true,
})

let totalDoc = new Datastore({
    filename: 'Total',
    autoload: true,
})


export default class SpenseController{
    constructor () {}

    static async getChange () {
        let result = await AsyncStorage.getItem("change");
        if(result === 'undefined'){
            await AsyncStorage.setItem("change",''+0);
            return 0;
        }
        return result;
    }

    static async saveChange (price) {
        await AsyncStorage.removeItem("change");
        await AsyncStorage.setItem("change",''+price);
        return price;
    }

    static async getPeriodicallyID (dayID) {
        let {
            day,month,year
        } = getDateFromID(dayID);
        return {
            dayID: gap({present:new Date(year,month,day)}).day(),
            monthID: gap({present:new Date(year,month,day)}).month(),
            yearID: gap({present:new Date(year,month,day)}).year(),
        }
    }   

    static async deleteAll () {
        await spenseDoc.removeAsync({
            "name":"Không tên"
        },{
            multi: true,
        })
        await totalDoc.removeAsync({
            Id: {$gte: 0}
        },{
            multi: true,
        })
    }

    static async check (spense) {
        if(!spense){
            // return new ActionResult(
            //     ActionResult.Exceptions.SpenseIsNull,
            //     true,
            // )
            return false;            
        }

        // return new ActionResult(
        //     spense,
        //     false,
        // )

        return true;
    }

    static async insert(spense, isChecked =false) {
        
        if(!isChecked) {
            let checkResult = await SpenseController.check(spense);
            // if(!checkResult.isOk())
            //     return checkResult;
            if(!checkResult)
                return null;
        }

        spense = await spenseDoc.insertAsync(spense);
        console.log('spense');

        return await SpenseController.insert_total(spense,true);
    }

    static async insert_total(spense, isChecked = false) {

        if(!isChecked) {
            let checkResult = SpenseController.check(spense);
            // if(!checkResult.isOk())
            //     return checkResult;
            if(!checkResult)
                return null;
        }

        let {
            day,
            month,
            year,
        } = getDateFromID(spense.dayID);

        let monthID =  gap({present: new Date(year,month,day)}).month();
        let yearID =  gap({present: new Date(year,month,day)}).year();
        let total = await totalDoc.findOneAsync({
            Id: yearID,
        });
        
        if(!total){
            total = Total.default();
        }

        console.log('total',JSON.stringify(total))
        // vì là thêm mới và không có thể trùng
        total.total = total.total + spense.price;
        
        let annualType_index = total.typeList.findIndex((val) => val.Id == spense.typeID);
        if(annualType_index == -1) {
            total.typeList.push({
                Id: spense.typeID,
                total: spense.price,
                spenseList: [{
                    Id: spense._id,
                    price: spense.price,
                    name: spense.name,
                }]
            });

        } else {
            total.typeList[annualType_index].total = total.typeList[annualType_index].total 
                + spense.price;
            total.typeList[annualType_index].spenseList.push({
                    Id: spense._id,
                    price: spense.price,
                    name: spense.name,
                })
        }
        console.log('total annually',JSON.stringify(total))

        let monthly_index = total.monthlyList.findIndex((val)=>val.Id==monthID);
        if(monthly_index == -1) {
            total.monthlyList.push({
                Id: monthID,
                total: spense.price,
                typeList: [{
                    Id: spense._id,
                    price: spense.price,
                    name: spense.name,
                }],
                dailyList:[
                    {
                        Id: spense.dayID,
                        total: spense.price,
                        typeList: [
                            {
                                Id: spense._id,
                                price: spense.price,
                                name: spense.name,
                            }
                        ]
                    }
                ]
            });

            console.log('total monthly initial',JSON.stringify(total))

             await totalDoc.removeAsync({
                Id: yearID,
            });

            console.log('total monthly initial remove',JSON.stringify(total))

            // if(result == 0)
            //     return null;
                // return new ActionResult(
                //     ActionResult.Exceptions.FailToRemoveTotal,
                //     true,
                // );
            result = await totalDoc.insertAsync(total);
            // return new ActionResult(
            //     result,
            //     false,
            // );
            return result;

        } else {

            total.monthlyList[monthly_index].total = total.monthlyList[monthly_index].total + spense.price;
            
            let monthlyType_index = total.monthlyList[monthly_index].typeList.findIndex((val)=>val.Id == spense.typeID);
            if(monthlyType_index == -1){
                total.monthlyList[monthly_index].typeList.push({
                    Id: spense.typeID,
                    total: spense.price,
                    spenseList: [{
                        Id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    }]
                });
            } else {
                total.monthlyList[monthly_index].typeList[monthlyType_index].total = total.monthlyList[monthly_index].typeList[monthlyType_index].total
                    + spense.price;
                total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList.push({
                        Id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    })
            }
        }
        console.log('total monthly',JSON.stringify(total))

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val.Id==spense.dayID);
        if(daily_index == -1) {
            total.monthlyList[monthly_index].dailyList.push({
                Id: spense.dayID,
                total: spense.price,
                typeList: [
                    {
                        Id: spense.typeID,
                        total: spense.price,
                        spenseList: [{
                            Id: spense._id,
                            price: spense.price,
                            name: spense.name,
                        }]
                    }
                ]
            });
            console.log('total daily initial',JSON.stringify(total))

            await totalDoc.removeAsync({
                Id: yearID,
            });
            // if(result == 0)
            //     return null
                // return new ActionResult(
                //     ActionResult.Exceptions.FailToRemoveTotal,
                //     true,
                // );
            result = await totalDoc.insertAsync(total);
            // return new ActionResult(
            //     result,
            //     false,
            // );
            return result;
        } else {
            total.monthlyList[monthly_index].dailyList[daily_index].total = total.monthlyList[monthly_index].dailyList[daily_index].total
                + spense.price;

            let dailyType_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList.findIndex((val)=>val.Id == spense.typeID);
            if(dailyType_index == -1){
                total.monthlyList[monthly_index].dailyList[daily_index].typeList.push({
                    Id: spense.typeID,
                    total: spense.price,
                    spenseList: [{
                        Id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    }]
                });
            } else {
                total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total
                    + spense.price;
                    total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList.push({
                    Id: spense._id,
                    price: spense.price,
                    name: spense.name,
                })
            }
        }
        console.log('total daily ',JSON.stringify(total))

        await totalDoc.removeAsync({
            Id: yearID,
        });
        // if(result == 0)
        //     return null;
            // return new ActionResult(
            //     ActionResult.Exceptions.FailToRemoveTotal,
            //     true,
            // );
        result = await totalDoc.insertAsync(total);
        // return new ActionResult(
        //     result,
        //     false,
        // );
        return result;
    }
    
    static async getListByDate(
        day = new Date().getDate(),
        month = new Date().getMonth(), 
        year = new Date().getFullYear()) {
        
        let dayID = gap({present: new Date(year,month,day)}).day();
        let monthID = gap({present: new Date(year,month,day)}).month();
        let yearID = gap({present: new Date(year,month,day)}).year();
        

        let total = await totalDoc.findOneAsync({
            Id: yearID,
        })
        // console.log('getListByDate monthID ',JSON.stringify(monthID))
        // console.log('getListByDate yearID ',JSON.stringify(yearID))

        if(!total){
            return [];
        }

        let monthly_index = total.monthlyList.findIndex((val)=>val.Id==monthID)

        if(monthly_index == -1) {
            return [];
        }

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val.Id==dayID)

        if(daily_index == -1) {
            return [];
        }
        

        let result = [];
        total.monthlyList[monthly_index].dailyList[daily_index].typeList.forEach((val) => {
            console.log('getListByDate val ',JSON.stringify(val))
            result = [...result,...val.spenseList];
        });

        return result;
    }

    static async getAllSpense(){
        let result = await spenseDoc.findAsync({});
        return result;
    }

    static async getAllTotal(){
        return await totalDoc.findAsync({})
    }

    static async getAllType(){
        return await typeDoc.findAsync({})
    }

    static async update (spense,isChecked = false) {
        let {
            dayID,
            monthID,
            yearID
        } = await SpenseController.getPeriodicallyID(spense.dayID);

        
        
        if(!isChecked) {
            let checkResult = SpenseController.check(spense);
            // if(!checkResult.isOk())
            //     return checkResult;
            if(!checkResult)
                return false;
        }

        await spenseDoc.updateAsync({
            _id: spense._id,
        },{
            ...spense,
        })
        

        let total = await totalDoc.findOneAsync({
            Id: yearID,
        });
        
        // console.log('update spense ',JSON.stringify(spense))
        // console.log('update total ',JSON.stringify(total.typeList))
        
        let annualType_index = total.typeList.findIndex((val)=>val.Id == spense.typeID);
        let annualSpense_index = total.typeList[annualType_index].spenseList.findIndex((val)=>val.Id == spense._id);

        // console.log('update spense ',JSON.stringify(spense))
        // console.log('update total ',JSON.stringify(total))
        // console.log('update spense ')
        // console.log('update total ')

        let oldPrice = total.typeList[annualType_index].spenseList[annualSpense_index].price;

        total.total = total.total - oldPrice;
        total.total = total.total + spense.price;

        
        
        total.typeList[annualType_index].total = total.typeList[annualType_index].total - oldPrice;
        total.typeList[annualType_index].total = total.typeList[annualType_index].total + spense.price;
     
        total.typeList[annualType_index].spenseList[annualSpense_index] = {
            Id: spense._id,
            price: spense.price,
            name: spense.name,
        }

        // console.log('update periodicalID ',JSON.stringify({
        //     dayID,
        //     monthID,
        //     yearID
        // }))
        // console.log('update spense ',JSON.stringify(spense))
        // console.log('update total ',JSON.stringify(total))

        let monthly_index = total.monthlyList.findIndex((val)=>val.Id == monthID);
        // console.log('update monthly_index ',JSON.stringify(monthly_index))
        let monthlyType_index = total.monthlyList[monthly_index].typeList.findIndex((val)=>val.Id == spense.typeID);
        // console.log('update monthlyType_index ',JSON.stringify(monthlyType_index))
        let monthlySpense_index = total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList.findIndex((val)=>val.Id == spense._id);
        // console.log('update monthlySpense_index ',JSON.stringify(monthlySpense_index))

        

        total.monthlyList[monthly_index].total = total.monthlyList[monthly_index].total - oldPrice;
        total.monthlyList[monthly_index].total = total.monthlyList[monthly_index].total + spense.price;

        total.monthlyList[monthly_index].typeList[monthlyType_index].total = total.monthlyList[monthly_index].typeList[monthlyType_index].total - oldPrice;
        total.monthlyList[monthly_index].typeList[monthlyType_index].total = total.monthlyList[monthly_index].typeList[monthlyType_index].total + spense.price;

        total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList[monthlySpense_index] = {
            Id: spense._id,
            price: spense.price,
            name: spense.name,
        }

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val.Id == dayID);
        let dailyType_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList.findIndex((val)=>val.Id == spense.typeID);
        let dailySpense_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList.findIndex((val)=>val.Id == spense._id);

        total.monthlyList[monthly_index].dailyList[daily_index].total = total.monthlyList[monthly_index].dailyList[daily_index].total - oldPrice;
        total.monthlyList[monthly_index].dailyList[daily_index].total = total.monthlyList[monthly_index].dailyList[daily_index].total + spense.price;

        total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total - oldPrice;
        total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total + spense.price;

        total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList[dailySpense_index] = {
            Id: spense._id,
            price: spense.price,
            name: spense.name,
        }

        

        return await totalDoc.updateAsync({
            Id: yearID,
        },{
            ...total
        });
    }

    static async delete (spense) {
        
        await spenseDoc.removeAsync({_id:spense._id});
        let {
            dayID,
            monthID,
            yearID
        } = await SpenseController.getPeriodicallyID(spense.dayID);
        
        let total = await totalDoc.findOneAsync({
            Id: yearID,
        });
        console.log('delete spense ',JSON.stringify(spense))
        console.log('delete total ',JSON.stringify(total))

        let annualType_index = total.typeList.findIndex((val)=>val.Id == spense. typeID);
        let annualSpense_index = total.typeList[annualType_index].spenseList.findIndex((val)=>val.Id == spense._id);

        total.total = total.total - spense.price;

        total.typeList[annualType_index].total = total.typeList[annualType_index].total - spense.price;

        total.typeList[annualType_index].spenseList.splice(annualSpense_index,1);

        let monthly_index = total.monthlyList.findIndex((val)=>val.Id == monthID);
        let monthlyType_index = total.monthlyList[monthly_index].typeList.findIndex((val)=>val.Id == spense.typeID);
        let monthlySpense_index = total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList.findIndex((val)=>val.Id == spense._id);

        total.monthlyList[monthly_index].total = total.monthlyList[monthly_index].total - spense.price;

        total.monthlyList[monthly_index].typeList[monthlyType_index].total = total.monthlyList[monthly_index].typeList[monthlyType_index].total - spense.price;

        total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList.splice(monthlySpense_index,1);

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val.Id == dayID);
        let dailyType_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList.findIndex((val)=>val.Id == spense.typeID);
        let dailySpense_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList.findIndex((val)=>val.Id == spense._id);

        total.monthlyList[monthly_index].dailyList[daily_index].total = total.monthlyList[monthly_index].dailyList[daily_index].total - spense.price;

        total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total - spense.price;

        total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList.splice(dailySpense_index,1);

        console.log("delete total: ",JSON.stringify(total))
        return await totalDoc.updateAsync({
            Id: yearID,
        },{
            ...total
        });
    }

    static async getDailyTotal(day,month,year){
        let date = new Date(year,month,day);

        let dayID = gap({present: date}).day();
        let monthID = gap({present: date}).month();
        let yearID = gap({present: date}).year();

        let total = await totalDoc.findOneAsync({
            Id: yearID,
        });
        // console.log('total',JSON.stringify(total))
        if(!total) return total;
        
        let monthly_index = total.monthlyList.findIndex((val)=>val.Id==monthID);
        if(monthly_index == -1) return null;

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val.Id==dayID);
        if(daily_index == -1) return null;

        return total.monthlyList[monthly_index].dailyList[daily_index];
    }

    
}
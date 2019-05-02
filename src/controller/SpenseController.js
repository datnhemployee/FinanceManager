import Datastore from "react-native-local-mongodb";
import Spense from "../model/Spense";
import { AsyncStorage } from 'react-native'
import IDGenerater from "../model/IDGenerater";
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

    static async insert_spense(spense, isChecked =false) {
        
        if(!isChecked) {
            let checkResult = SpenseController.check(spense);
            // if(!checkResult.isOk())
            //     return checkResult;
            if(!checkResult)
                return false;
        }

        await spenseDoc.insertAsync(spense);
        await IDGenerater.apply(IDGenerater.nextID_Spense);

        return SpenseController.insert_total(spense,true);
    }

    static async insert_total(spense, isChecked = false) {

        if(!isChecked) {
            let checkResult = SpenseController.check(spense);
            // if(!checkResult.isOk())
            //     return checkResult;
            if(!checkResult)
                return false;
        }

        let {
            day,
            month,
            year,
        } = getDateFromID(spense.dayID);

        let monthID =  gap({present: new Date(year,month,day)}).month();
        let yearID =  gap({present: new Date(year,month,day)}).year();
        let total = await totalDoc.findOneAsync({
            _id: yearID,
        });
        
        if(!total){
            total = Total.default();
        }

        // vì là thêm mới và không có thể trùng
        total.total = total.total + spense.price;
        
        let annualType_index = total.typeList.findIndex((val) => val._id == spense.typeID);
        if(annualType_index == -1) {
            total.typeList.push({
                _id: spense.typeID,
                total: spense.price,
                spenseList: [{
                    _id: spense._id,
                    price: spense.price,
                    name: spense.name,
                }]
            });

        } else {
            total.typeList[annualType_index].total = total.typeList[annualType_index].total 
                + spense.price;
            total.typeList[annualType_index].spenseList.push({
                    _id: spense._id,
                    price: spense.price,
                    name: spense.name,
                })
        }

        let monthly_index = total.monthlyList.findIndex((val)=>val._id==monthID);
        if(monthly_index == -1) {
            total.monthlyList.push({
                _id: monthID,
                total: spense.price,
                typeList: [{
                    _id: spense._id,
                    price: spense.price,
                    name: spense.name,
                }],
                dailyList:[
                    {
                        _id: spense.dayID,
                        total: spense.price,
                        typeList: [
                            {
                                _id: spense._id,
                                price: spense.price,
                                name: spense.name,
                            }
                        ]
                    }
                ]
            });

            let result = await totalDoc.removeAsync({
                _id: yearID,
            });
            if(result == 0)
                return new ActionResult(
                    ActionResult.Exceptions.FailToRemoveTotal,
                    true,
                );
            result = await totalDoc.insertAsync(total);
            // return new ActionResult(
            //     result,
            //     false,
            // );
            return result;

        } else {

            total.monthlyList[monthly_index].total = total.monthlyList[monthly_index].total + spense.price;
            
            let monthlyType_index = total.monthlyList[monthly_index].typeList.findIndex((val)=>val._id == spense.typeID);
            if(monthlyType_index == -1){
                total.monthlyList[monthly_index].typeList.push({
                    _id: spense.typeID,
                    total: spense.price,
                    spenseList: [{
                        _id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    }]
                });
            } else {
                total.monthlyList[monthly_index].typeList[monthlyType_index].total = total.monthlyList[monthly_index].typeList[monthlyType_index].total
                    + spense.price;
                total.monthlyList[monthly_index].typeList[monthlyType_index].spenseList.push({
                        _id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    })
            }
        }

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val._id==spense.dayID);
        if(daily_index == -1) {
            total.monthlyList[monthly_index].dailyList.push({
                _id: spense.dayID,
                total: spense.price,
                typeList: [
                    {
                        _id: spense.typeID,
                        total: spense.price,
                        spenseList: [{
                            _id: spense._id,
                            price: spense.price,
                            name: spense.name,
                        }]
                    }
                ]
            });

            let result = await totalDoc.removeAsync({
                _id: yearID,
            });
            if(result == 0)
                return null
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

            let dailyType_index = total.monthlyList[monthly_index].dailyList[daily_index].typeList.findIndex((val)=>val._id == spense.typeID);
            if(dailyType_index == -1){
                total.monthlyList[monthly_index].dailyList[daily_index].typeList.push({
                    _id: spense.typeID,
                    total: spense.price,
                    spenseList: [{
                        _id: spense._id,
                        price: spense.price,
                        name: spense.name,
                    }]
                });
            } else {
                total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total = total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].total
                    + spense.price;
                    total.monthlyList[monthly_index].dailyList[daily_index].typeList[dailyType_index].spenseList.push({
                    _id: spense._id,
                    price: spense.price,
                    name: spense.name,
                })
            }
        }

        let result = await totalDoc.removeAsync({
            _id: yearID,
        });
        if(result == 0)
            return null;
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
        
        let dayID = gap({present: new Date(year,month,day)}).month();
        let monthID = gap({present: new Date(year,month,day)}).month();
        let yearID = gap({present: new Date(year,month,day)}).year();

        let total = await totalDoc.findOneAsync({
            _id: yearID,
        })

        if(!total){
            return new ActionResult(
                ActionResult.Exceptions.NotExistYearID,
                true,
            )
        }

        let monthly_index = total.monthlyList.findIndex((val)=>val._id==monthID)

        if(monthly_index == -1) {
            return new ActionResult(
                ActionResult.Exceptions.NotExistMonthID,
                true,
            )
        }

        let daily_index = total.monthlyList[monthly_index].dailyList.findIndex((val)=>val._id==dayID)

        if(daily_index == -1) {
            return new ActionResult(
                ActionResult.Exceptions.NotExistMonthID,
                true,
            )
        }

        let result = [];
        total.monthlyList[monthly_index].dailyList[daily_index].typeList.foreach(
            (val) => {result = [...result,...val.spenseList]}
        )
    }

}
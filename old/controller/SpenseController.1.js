import Datastore from "react-native-local-mongodb";
import Spense from "../model/Spense";
import IDGenerater from "../model/IDGenerater";
import { gap, getDatesFromID } from "../utils/DateConvert";
import Total from "../model/Total";

let SpenseDoc = new Datastore({
    filename: 'Spense',
    autoload: true,
})

let TypeDoc = new Datastore({
    filename: 'Type',
    autoload: true,
})

let TotalDoc = new Datastore({
    filename: 'Type',
    autoload: true,
})

export default class SpenseController{
    constructor () {}

    static async deleteAll () {
        await SpenseDoc.removeAsync({
            _id: {$gte: 0}
        })
    }

    static async existType (typeID) {
        if (!typeID)
            return new ActionResult(
                ActionResult.Code.Error,
                'Giá trị truyền vào '+ typeID,
            );
        let isExisted = (typeID < (await IDGenerater.getNextID(IDGenerater.nextID_Type)));
        console.log(`So sánh`, temp)
        if(isExisted)
            return new ActionResult(
                ActionResult.Code.Ok,
                true,
            )
        return new ActionResult(
            ActionResult.Code.Ok,
            false,
        )
    }

    static async checkSpense (spense) {

        if(!spense) 
            return new ActionResult( 
                ActionResult.Code.Error,
                'Giá trị truyền vào '+ spense,
            )

    }

    static async insert (spense) {

        if(SpenseController.checkSpense(spense)=== ActionResult.Code.Error)
            return false;

        let result = await SpenseController.insertTotal(spense.dateID,spense.price,true);

        if(result.code === ActionResult.Code.Error)
            return result;
        
        result = await SpenseDoc.insertAsync(spense);
        console.log(`insert xong nè`, JSON.stringify(spense))
    }

    static async updateTotal (
        spense,
        isChecked = false) {
        
        if(!isChecked){
            let result = this.checkSpense(spense);
            if(result.code === ActionResult.Code.Error)
                return result;
        }
        
        let {
            _id,
            name,
            typeID,
            price,
            dateID,
        } = spense;

        let {
            day,
            month,
            year,
        } =getDatesFromID(dateID);

        let dateID = gap({present: new Date(year,month,day)}).date();
        let monthID = gap({present: new Date(year,month,day)}).month();
        let yearID = gap({present: new Date(year,month,day)}).year();

        let total_byYear = await SpenseController.getTotal_byYear(
            yearID,
        );
        let total_byMonth_index = -1;
        let total_byDate_index = -1;
        if(total_byYear) {
            total_byMonth_index = total_byYear.monthList.findIndex((e)=>e._id==monthID);
            if(total_byMonth != -1)
                total_byDate_index = total_byYear.monthList[total_byMonth]
                    .dailyList.findIndex((e)=>e._id==dateID);
        }

        const createTotal_byYear = () => {
            let temp = Total.default();
    
            let yearTotal = temp.total;
            let monthTotal = temp.monthList[0].total;
            let dayTotal = temp.monthList[0].dailyList[0].total;
            
            temp._id = yearID;
            temp.total = yearTotal + price;
            temp.types[0]._id= typeID,
            temp.types[0].total= price,
            temp.types[0].spenseList.push({
                    _id: _id,
                    name: name,
                    price: price,
            });
    
            temp.monthList[0]._id = monthID;
            temp.monthList[0].total = monthTotal + price;
            temp.monthList[0].typeList[0]._id= typeID,
            temp.monthList[0].typeList[0].total= price,
            temp.monthList[0].typeList[0].spenseList.push({
                    _id: _id,
                    name: name,
                    price: price,
            });
    
            temp.monthList[0].dailyList[0].day = day;
            temp.monthList[0].dailyList[0].total = dayTotal + price;
            temp.monthList[0].dailyList[0].typeList[0]._id= typeID,
            temp.monthList[0].dailyList[0].typeList[0].total= price,
            temp.monthList[0].dailyList[0].typeList[0].spenseList.push({
                    _id: _id,
                    name: name,
                    price: price,
            });
    
            result = await TotalDoc.insertAsync(temp);
            return new ActionResult(
                ActionResult.Code.Ok,
                result,
            )
        }

        const updateTotal_byPeriodicity = (total) => {
            let type_index = total.typeList.findIndex((e)=>e._id==typeID);
            if(type_index == -1) {
                let newType = {
                    _id: typeID,
                    total: price,
                    spenseList: [{
                        _id: _id,
                        name: name,
                        price: price,
                    }]
                }
                total.typeList.push(newType);
                total.total = total.total + price;
            } else {
                let spense_index = total.typeList[type_index].spenseList.findIndex((e)=>e._id==_id);
                if(spense_index == -1) {
                    total.typeList[type_index].spenseList.push({
                        _id: _id,
                        name: name,
                        price: price,
                    });
                    total.typeList[type_index].total = total.typeList[type_index].total + price;
                } else {
                    total.typeList[type_index].total 
                        = total.typeList[type_index].total 
                        - total.typeList[type_index].spenses[spense_index].price;

                    total.typeList[type_index].total 
                        = total.typeList[type_index].total 
                        + price;

                    
                    total.typeList[type_index].spenseList[spense_index] = {
                        _id: _id,
                        name: name,
                        price: price,
                    }
                }
            }
            // return type_index;
        }

        const createTotal_byMonth = (monthList) => {
            
            monthList.push({
                _id: monthID,
                total: price,
                typeList: [
                    {
                        _id: typeID,
                        total: price,
                        spenseList: [{
                            _id: _id,
                            price: price,
                            name: name,
                        }]
                    }
                ],
                dailyList: [
                    {
                        _id: dateID,
                        total: price,
                        typeList: [
                            {
                                _id: typeID,
                                total: price,
                                spenseList: [{
                                    _id: _id,
                                    price: price,
                                    name: name,
                                }]
                            }
                        ]
                    }
                ],
            })
        }

        const createTotal_byDate = (dailyList) => {
            
            dailyList.push({
                _id: dateID,
                total: price,
                typeList: [
                    {
                        _id: typeID,
                        total: price,
                        spenseList: [{
                            _id: _id,
                            price: price,
                            name: name,
                        }]
                    }
                ]
            })
        }

        if(!total_byYear){
            return createTotal_byYear();
        } else {
            updateTotal_ByYear(total_byYear);
            if(total_byMonth_index == -1){
                createTotal_byMonth(total_byYear);
                result = await TotalDoc.insertAsync(temp);
                return new ActionResult(
                    ActionResult.Code.Ok,
                    result,
                )
            } else {
                let total_byMonth = total_byYear.monthList[total_byMonth_index];
                updateTotal_ByMonth(total_byMonth);
                if(total_byDate_index == -1){
                    return createTotal_byDate(total_byMonth);
                } 
                let total_byDate = total_byYear
                    .monthList[total_byMonth_index]
                    .dailyTotal[total_byDate_index];
                return updateTotal_ByDate(total_byDate);
            }
        }


        

        // Nếu có spense tại year && có monthID
        const updateTotal_ByMonth = () => {
            
        }

        const createTotal_ByDate = () => {

        }
        const updateTotal_ByDate = () => {
            
        }
        if (!total_byYear) {
            await SpenseController.createTotal_ByYear(spense);
            return new ActionResult(
                ActionResult.Code.Ok,
                'Tạo mới theo năm.'
            );
        }
        
        // #region UPDATE_THEO_NĂM

       
        if(yearType == -1) {
            let newSpense = {
                _id: typeID,
                total: price,
                spenses: [{
                    _id: _id,
                    name: name,
                    price: price,
                }]
            }
            total.types.push(newSpense);
            total.yearTotal = total.yearTotal + price;
        } else {
            total.yearTotal = total.yearTotal - total.types[yearType].price;
            total.types[yearType] = {
                _id: _id,
                name: name,
                price: price,
            };
            total.yearTotal = total.yearTotal + price;
        }
        //#endregion

        let monthlyTotal = total.monthlyTotal.findIndex((e)=>e.monthID==month);
        if (monthlyTotal==-1) {
            await createTotal_ByMonth(spense);
            return new ActionResult(
                ActionResult.Code.Ok,
                'Tạo mới theo tháng.'
            );
        }

        // #region UPDATE_THEO_NĂM

        let monthType = total.monthlyTotal[monthlyTotal].types.findIndex((e)=>e._id==typeID);
        if(monthType == -1) {
            let newSpense = {
                _id: typeID,
                total: price,
                spenses: [{
                    _id: _id,
                    name: name,
                    price: price,
                }]
            }
            total.monthlyTotal[monthlyTotal].types.push(newSpense);
            total.monthlyTotal[monthlyTotal].total = total.monthlyTotal[monthlyTotal].total + price;
        } else {
            total.monthlyTotal[monthlyTotal].total = total.monthlyTotal[monthlyTotal].total - total.types[monthlyTotal].price;
            total.types[monthlyTotal] = {
                _id: _id,
                name: name,
                price: price,
            };
            total.yearTotal = total.yearTotal + price;
        }
        //#endregion

        let dailyTotal = total.monthlyTotal[monthlyTotal].dailyTotal.findIndex((e)=>e.dateID==day);
        if (dailyTotal==-1) {
            await createTotal_ByDate(spense);
            return new ActionResult(
                ActionResult.Code.Ok,
                'Tạo mới theo tháng.'
            );
        }

        let dateType = total.monthlyTotal[monthlyTotal].dailyTotal[dailyTotal].types.findIndex((e)=>e._id==typeID);
        if(dateType == -1) {
            let newSpense = {
                _id: typeID,
                total: price,
                spenses: [{
                    _id: _id,
                    name: name,
                    price: price,
                }]
            }
            total.monthlyTotal[monthlyTotal].dailyTotal[dailyTotal].types.push(newSpense);
        }

        return new ActionResult(
            ActionResult.Code.Ok,
            ,
        )
    }


    static async getTotal_byYear (
        yearID,
    ) {
        
        let result = await TotalDoc.findOneAsync({
            yearID: yearID,
        })
        return new ActionResult(
            ActionResult.Code.Ok,
            result,
        )
    }

    static async insertType (type) {
        if(!spense 
            || spense === null
            || SpenseController.exist(spense.type))
            return false;
        return await TypeDoc.insertAsync(type);
    }

    static async deleteAll () {
        return await SpenseDoc.removeAsync({
            _id: {$gte:0},
        },{multi:true})
    }

    static async selectAll () {
        return await SpenseDoc.findAsync({_id: {$gte:0}});
    }

    static async select (_id) {
        return await SpenseDoc.findAsync({_id: _id});
    }

    static async selectType () {
        return await TypeDoc.findAsync({});
    }

    static async selectByDate (date = new Date()) {
        let yearID = gap({present: date}).year();
        let monthID = gap({present: date}).month();
        let dateID = gap({present: date}).date();
        return await TypeDoc.findAsync({
            yearID: yearID,
            monthlyTotal: [{
                monthID: monthID,
                dailyTotal: [{
                    dateID: dateID,
                }]
            }]
        });
    }

    static updatePeriodicalList(
        spense,
        periodicalTotal,
        isChecked = false
        ) {

        let {
            _id,
            name,
            typeID,
            price,
        } = spense;

        if(!isChecked)
            return SpenseController.checkSpense(spense);

        periodicalTotal.total = periodicalTotal.total + price;
        
        let typeIndex = periodicalTotal.typeList.findIndex(
            (val) => val._id == typeID
        )

        if(typeIndex == -1)
            return new ActionResult (
                true,
                ActionResult.Exception.NotExistedType,
            )
        
        let spenseList = periodicalTotal.typeList[typeIndex].spenseList;

        let spenseIndex = spenseList.findIndex(
            (val) => val._id == _id
        )

        if(typeIndex == -1)
            return new ActionResult (
                true,
                ActionResult.Exception.NotExistedSpense
            )

        spenseList[spenseIndex] = {
            _id,
            name,
            price,
        }

        return new ActionResult (
            false,
            {
                _id,
                name,
                price,
            }
        )
    }

    static async updateAnnualList(
        spense,
        isChecked = false
        ) {
        let {
            _id,
            name,
            typeID,
            price,
            dateID,
        } = spense;

        let result = SpenseController.checkSpense(spense).isOk();
        if(!result){
            return result;
        }

        let date =  getDatesFromID(dateID);
        let dayID = date.day;
        let monthID = date.month;
        let yearID = date.year;

        let annualyTotal = await TotalDoc.findAsync({_id: yearID});

        if(annualyTotal.length==0)
            return new ActionResult(
                ActionResult.Exception.NotExistedAnnualTotal,
                true,
            );

        result = SpenseController.updatePeriodicalList(
            spense,
            annualyTotal[0],
            true,
        )

        if(result.isOk()){
            let monthlyTotalIndex = annualyTotal[0].monthList.findIndex(
                (val) => val._id == monthID
            );

            if(monthlyTotalIndex == -1)
                return new ActionResult(
                    ActionResult.Exception.NotExistedMonthTotal,
                    true,
                )

            let monthlyTotal = annualyTotal[0].monthList[monthlyTotalIndex];

            result = SpenseController.updatePeriodicalList(
                spense,
                monthlyTotal,
                true,
            )

            if(result.isOk()){
                let dailyTotalIndex = monthlyTotal.dailyList.findIndex(
                    (val) => val._id == dayID
                );
    
                if(dailyTotalIndex == -1)
                    return new ActionResult(
                        ActionResult.Exception.NotExistedDailyTotal,
                        true,
                    )
    
                let dailyTotal = monthlyTotal.dailyList[dailyTotalIndex];
    
                result = SpenseController.updatePeriodicalList(
                    spense,
                    dailyTotal,
                    true,
                )
            } 
        } else {
            return result;
        }
    }

}
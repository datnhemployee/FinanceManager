import Connection from "./Connection";
import { gapYear, gapDate, gapMonth } from "../utils/DateConvert";

export default class SpensesController{
    constructor () {
    }

    static async db () {return await Connection.getConnection();}

    static async isExistedDate(dateID,monthID) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `EXIST 
                ( SELECT * 
                FROM LICHNGAY 
                WHERE Ngay = ? AND
                Thang = ? )`,
                [dateID,monthID],
                (tx,rs)=>{
                    if(rs.rows.item(0)){
                        result = true;
                    }
                },
                (err)=>{
                    console.log('err',err);
                    result = null;
                });
        })
        return result;
    }

    static async isExistedMonth(monthID,yearID) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `EXIST 
                ( SELECT * 
                FROM LICHTHANG
                WHERE Thang = ? AND
                    Nam = ? )`,
                [monthID,yearID],
                (tx,rs)=>{
                    if(rs.rows.item(0)){
                        result = true;
                    }
                },
                (err)=>{
                    console.log('err',err);
                    result = null;
                });
        })
        return result;
    }

    static async isExistedYear(yearID) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `EXIST 
                ( SELECT * 
                FROM LICHNAM
                WHERE Nam = ? )`,
                [yearID],
                (tx,rs)=>{
                    if(rs.rows.item(0)){
                        result = true;
                    }
                },
                (err)=>{
                    console.log('err',err);
                    result = null;
                });
        })
        return result;
    }

    static async insertDate (date,month) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            let isExisted = SpensesController.isExistedDate(val.Date);
            if(!isExisted){
                console.log('valid Date!!!');
                return;
            }
            await tx.executeSql(`INSERT INTO LICHNGAY (
                Ngay,
                Thang,
            ) VALUES (?,?)`,
            [
                date,
                month,
            ])
        })
        return result;
    }

    static async insertMonth (month,year) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            let isExisted = SpensesController.isExistedDate(val.Date);
            if(!isExisted){
                console.log('valid Month!!!');
                return;
            }
            await tx.executeSql(`INSERT INTO LICHTHANG (
                Thang,
                Nam,
            ) VALUES (?,?)`,
            [
                month,
                year,
            ],(tx,rs)=>{
                result = true;
            },(tx,er)=>{
                result = false;
            })
        })
        return result;
    }

    static async insertYear (number) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            let isExisted = SpensesController.isExistedDate(val.Date);
            if(!isExisted){
                console.log('valid Year!!!');
                return;
            }
            await tx.executeSql(`INSERT INTO LICHNAM (
                Nam,
            ) VALUES (?)`,
            [
                number,
            ])
        })
        return result;
    }

    static async insert (spense) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            let dateID = gapDate(spense.date);
            let monthID = gapMonth(spense.date);
            let yearID = gapYear(spense.date);

            SpensesController.insertYear(yearID)
            SpensesController.insertMonth(monthID,yearID)
            SpensesController.insertDate(dateID,monthID)
            
            await tx.executeSql(`INSERT INTO CHITIEU (
                TenChiTieu,
                MaLoaiChiTieu,
                Gia,
                GhiChu,
                Ngay,
            ) VALUES (?,?,?,?,?,?)`,
            [
                spense.name,
                spense.typeID,
                spense.price,
                spense.note,
                spense.date,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHNAM
            SET TongNam = TongNam + ?
            WHERE Nam = ? `,
            [
                spense.price,
                yearID,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHTHANG
            SET TongThang = TongThang + ?
            WHERE Thang = ? AND Nam = ?`,
            [
                spense.price,
                monthID,
                yearID,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHNGAY
            SET TongChiTieu = TongChiTieu + ?
            WHERE Ngay = ? AND Thang = ?`,
            [
                spense.price,
                dateID,
                monthID,
            ],()=>{result = true},
            ()=>{result = null})

        });
        return result;
    }

    static async delete (spense) {
        let db = await SpensesController.db();
        let result = false;
        await db.transaction(async (tx) => {
            let dateID = gapDate(spense.date);
            let monthID = gapMonth(spense.date);
            let yearID = gapYear(spense.date);

            await tx.executeSql(`DELETE FROM CHITIEU 
            WHERE Ngay = ? `,
            [
                dateID,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHNAM
            SET TongNam = TongNam - ?
            WHERE Nam = ? `,
            [
                spense.price,
                yearID,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHTHANG
            SET TongThang = TongThang - ?
            WHERE Thang = ? AND Nam = ?`,
            [
                spense.price,
                monthID,
                yearID,
            ],()=>{result = true},
            ()=>{result = null})

            if(result !== true) return;

            await tx.executeSql(`UPDATE LICHNGAY
            SET TongChiTieu = TongChiTieu - ?
            WHERE Ngay = ? AND Thang = ?`,
            [
                spense.price,
                dateID,
                monthID,
            ],()=>{result = true},
            ()=>{result = null})

        });
        return result;
    }

    static async update (spense) {
        let result = await SpensesController.delete(spense);
        if(result !== true) return;
        result = await SpensesController.delete(spense);
        return result;
    }
}
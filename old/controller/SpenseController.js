import Connection from "./Connection";
import { gapYear, gapDate, gapMonth, gap } from "../utils/DateConvert";
import ConstantValue from "../constant/ConstantValue";
import Exceptions from "../utils/Exceptions";
import Spense from "../model/Spense";

const DEFAULT_DATE = ConstantValue.DEFAULT_DATE;

export default class SpensesController{
    constructor () {
    }

    static async db () {return await Connection.getConnection();}

    static async exist () {
        let db = await SpensesController.db();
        let result = false;

        return {
            async date(date = DEFAULT_DATE) {
                
                let dateID = gap({
                    present: date,
                }).date();
                if(dateID < 0) 
                    return Exceptions.throw(
                        Exceptions.INVALID_DATE
                    );

                await db.transaction((tx) =>{
                    tx.executeSql(
                        ` SELECT * 
                        FROM LICHNGAY
                        WHERE Ngay = ? `,
                        [dateID],
                        (tx,rs) => {
                            if(rs.rowsAffected === 0)
                                return Exceptions.throw(
                                    Exceptions.UNAVAILABLE_DATE,
                                )
                            if(rs.rows.item(0)){
                                result = true;
                            }
                        },
                        (tx, err) => {
                            console.log(`Lỗi khác: `,err.message);
                        }
                    )
                })
                await db.close();
                return result;
            },
        }
    }

    static async getTotal (date = DEFAULT_DATE) {
        let db = await SpensesController.db();
        let result = [
            -2, // Ngày muốn tìm trước ngày mặc định (5/4/2019)
            -1, // Ngày muốn tìm không tồn tại
        ];

        let dateID = gap({
            present: date,
        }).date();

        if(dateID < 0) 
            return result[0];

        return {
            async byDate() {

                await db.transaction((tx) =>{
                    tx.executeSql(
                        ` SELECT TongNgay
                        FROM LICHNGAY
                        WHERE Ngay = ? `,
                        [dateID],
                        (tx,rs) => {
                            if(rs.rowsAffected === 0){
                                result = result[1];
                            }
                            let temp = rs.rows.item(0);
                            if(temp && temp!== null){
                                result = temp;
                            }
                        },
                        (tx, err) => {
                            console.log(`Lỗi khác: `,err.message);
                        }
                    )
                })

                await db.close();
                return result;
            },
            async byMonth () {
                let monthID = gap({
                    present: date,
                }).month();

                await db.transaction((tx) =>{
                    tx.executeSql(
                        ` SELECT TongThang
                        FROM LICHTHANG
                        WHERE Ngay = ? `,
                        [monthID],
                        (tx,rs) => {
                            if(rs.rowsAffected === 0){
                                result = result[1];
                            }
                            let temp = rs.rows.item(0);
                            if(temp && temp!== null){
                                result = temp;
                            }
                        },
                        (tx, err) => {
                            console.log(`Lỗi khác: `,err.message);
                        }
                    )
                })

                await db.close();
                return result;
            },
            async byYear () {
                let yearID = gap({
                    present: date,
                }).year();

                await db.transaction((tx) =>{
                    tx.executeSql(
                        ` SELECT TongNam
                        FROM LICHNAM
                        WHERE Nam = ? `,
                        [yearID],
                        (tx,rs) => {
                            if(rs.rowsAffected === 0){
                                result = result[1];
                            }
                            let temp = rs.rows.item(0);
                            if(temp && temp!== null){
                                result = temp;
                            }
                        },
                        (tx, err) => {
                            console.log(`Lỗi khác: `,err.message);
                        }
                    )
                })

                await db.close();
                return result;
            }
        }
    }

    static async insertDate (date = new Date()) {
        let db = await SpensesController.db();
        const RESULT = {
            SUCCESS: 0,
            UNABLE_INSERT_DATE: -1,
            UNABLE_INSERT_MONTH: -2,
            UNABLE_INSERT_YEAR: -3,
        }
        let result = RESULT.SUCCESS;

        let dateID = gap({present:date}).date();
        let monthID = gap({present:date}).month();
        let yearID = gap({present:date}).year();

        await db.executeSql(
            `INSERT INTO LICHNGAY (
                Ngay,
                TongNgay
            ) VALUES ( ? , ? )`,
            [
                dateID,
                ConstantValue.INIT_NUMBER,
            ],
            ()=>{},
            ()=>{console.log(`err`);result=RESULT.UNABLE_INSERT_DATE});
        

        await db.executeSql(
            `INSERT INTO LICHTHANG (
                Thang,
                TongThang,
            ) VALUES ( ? , ? )`,
            [
                monthID,
                ConstantValue.INIT_NUMBER,
            ],
            ()=>{},
            ()=>{result=RESULT.UNABLE_INSERT_DATE});

        await db.executeSql(
            `INSERT INTO LICHNAM (
                Nam,
                TongNam
            ) VALUES ( ? , ? )`,
            [
                yearID,
                ConstantValue.INIT_NUMBER,
            ],
            ()=>{},
            ()=>{result=RESULT.UNABLE_INSERT_DATE});

        await db.close();
        return result;    
    }

    static async insert (spense = new Spense()) {
        let db = await SpensesController.db();
        
        const RESULT = {
            SUCCESS: 0,
            UNABLE_INSERT_DATE: -1,
            UNABLE_INSERT_SPENSE: -2,
            UNABLE_UPDATE_DATE: -3,
            UNABLE_UPDATE_MONTH: -4,
            UNABLE_UPDATE_YEAR: -5,
        }
        let result = RESULT.SUCCESS;
        
        console.log('continue',await SpensesController.insertDate(spense.date));
        
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `INSERT INTO CHITIEU ( TenChiTieu, MaLoaiChiTieu, Gia, GhiChu, Ngay ) VALUES ( ? , ? , ? , ? , ? )`,
                [
                    spense.name,
                    spense.typeID,
                    spense.price,
                    spense.note,
                    dateID,
                ],
                () => {},
                () => {result = RESULT.UNABLE_INSERT_SPENSE}
            );
        })
        
        if(result != RESULT.SUCCESS) return;

        result = await SpensesController.updateTotal({
            date: spense.date,
            delta: spense.price,
        });

        await db.close();
        return result;
    }

    static async get () {
        let db = await SpensesController.db();
        const RESULT = {
            UNABLE_SELECT_SPENSE: -1,
        }
        let result = RESULT.UNABLE_SELECT_SPENSE;
        return {
            async spense () {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        `SELECT * 
                        FROM LICHNAM `,
                        [
                        ],
                        (tx,rs) => {
                            let temp = rs.rows.item(0);
                            if(temp){
                                let i = 0;
                                result = [];
                                for(;i<rs.rows.length;i++){
                                    result=[
                                        ...result,
                                        ...[
                                            rs.rows.item(i),
                                        ]
                                    ]
                                }
                            }
                        },
                        () => {result = RESULT.UNABLE_SELECT_SPENSE}
                    );
                });

                await db.close();
                return result;
            },
            async spenseID (id = 0) {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        `SELECT * 
                        FROM CHITIEU 
                        WHERE MaChiTieu = ? `,
                        [
                            id,
                        ],
                        (tx,rs) => {
                            let temp = rs.rows.item(0);
                            if(temp) result = temp;
                        },
                        () => {result = RESULT.UNABLE_SELECT_SPENSE}
                    );
                });
                await db.close();
                return result;
            }
        }
    }

    static async delete (spense = new Spense()) {
        let db = await SpensesController.db();
        const RESULT = {
            SUCCESS: 0,
            UNABLE_DELETE_SPENSE: -1,
        }
        let result = RESULT.SUCCESS;
        await db.transaction(async (tx) => {

            await tx.executeSql(`DELETE FROM CHITIEU 
            WHERE MaChiTieu = ? `,
            [
                spense.id,
            ],()=>{},
            ()=>{result = RESULT.UNABLE_DELETE_SPENSE})

            if(result !== true) return;

            result = await (await SpensesController.update()).total({
                date: spense.date,
                delta: spense.price,
            })

        });

        await db.close();
        return result;
    }

    static async update (spense) {
        const RESULT = {
            SUCCESS: 0,
            UNABLE_SELECT_SPENSE: -1,
            UNABLE_DELETE_SPENSE: -1,
        }
        
        let result = await (await SpensesController.get()).spense(spense.id);

        if(result !== RESULT.UNABLE_SELECT_SPENSE) {
            result = await SpensesController.delete(result);
            if(result === RESULT.UNABLE_DELETE_SPENSE) 
                return result;
            result = await (await SpensesController.insert()).spense(spense);
        }
        return result;
    }
    
    static async updateTotal ({
        date= DEFAULT_DATE,
        delta= ConstantValue.INIT_NUMBER,
    } = {}) {

        let db = await SpensesController.db();
        const RESULT = {
            SUCCESS: 0,
            UNABLE_UPDATE_DATE: -1,
            UNABLE_UPDATE_MONTH: -2,
            UNABLE_UPDATE_YEAR: -3,
        }

        let dateID = gap({present:date}).date();
        let monthID = gap({present:date}).month();
        let yearID = gap({present:date}).year();

        await db.transaction(async (tx) => {
            await tx.executeSql(
                `UPDATE LICHNGAY 
                SET TongNgay = TongNgay + ?
                WHERE Ngay = ? `,
                [
                    dateID,
                    delta,
                ],
                () => {},
                () => {result = RESULT.UNABLE_UPDATE_DATE})
            
            if(result != RESULT.SUCCESS) return;
            
            await tx.executeSql(
                `UPDATE LICHTHANG 
                SET TongThang = TongThang + ?
                WHERE Thang = ? `,
                [
                    monthID,
                    delta,
                ],
                () => {},
                () => {result = RESULT.UNABLE_UPDATE_MONTH});
            
            if(result != RESULT.SUCCESS) return;

            await tx.executeSql(
                `UPDATE LICHNGAY 
                SET TongNam = TongNam + ?
                WHERE Nam = ? `,
                [
                    yearID,
                    delta,
                ],
                () => {},
                () => {result = RESULT.UNABLE_UPDATE_YEAR});
        })

        await db.close();
        return result;
    }
}
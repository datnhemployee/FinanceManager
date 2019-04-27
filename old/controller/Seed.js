import Connection from "./Connection";
import { AsyncStorage } from "react-native";

export default class Seed{
    
    static tableName () {
        return {
            Type:`CREATE TABLE LOAICHITIEU (
                    MaLoaiChiTieu	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                    TenLoaiChiTieu	TEXT NOT NULL
                );`,
            AnnualSchedule: `CREATE TABLE LICHNAM (
                Nam	INTEGER NOT NULL UNIQUE,
                TongNam	INTEGER NOT NULL,
                PRIMARY KEY(Nam)
            );`,
            MonthlySchedule: `CREATE TABLE LICHTHANG (
                Thang	INTEGER NOT NULL UNIQUE,
                TongThang	INTEGER NOT NULL,
                PRIMARY KEY(Thang)
            );`,
            DailySchedule: `CREATE TABLE LICHNGAY (
                Ngay	INTEGER NOT NULL UNIQUE,
                TongNgay	INTEGER NOT NULL,
                PRIMARY KEY(Ngay)
            );`,
            Spenses: `CREATE TABLE CHITIEU (
                MaChiTieu	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                TenChiTieu	INTEGER NOT NULL UNIQUE,
                MaLoaiChiTieu	INTEGER,
                Gia	INTEGER NOT NULL,
                GhiChu	TEXT,
                Ngay	INTEGER NOT NULL,
                FOREIGN KEY(MaLoaiChiTieu) REFERENCES LOAICHITIEU(MaLoaiChiTieu) ON DELETE CASCADE
            );`,
        }
    }

    static deleteTable () {
        return {
            Type: ` DROP TABLE LOAICHITIEU `,
            AnnualSchedule:` DROP TABLE LICHNAM `,
            MonthlySchedule: ` DROP TABLE LICHTHANG `,
            DailySchedule: ` DROP TABLE LICHNGAY `,
            Spenses: ` DROP TABLE CHITIEU `,
        }
    }

    static async excute (
        alias,
        params,
        success= (rs) => {},
        failed = (err)=>{}) {
        let db = await Connection.getConnection();
        await db.transaction((tx)=>{
            tx.executeSql(alias,params,(tx,rs)=>{
                console.log('result',rs);
                success(rs);
            },(err)=>{
                console.log('err',err);
                failed(err);
            });
        })
    }

    get drop () {
        return {
            table:{
                type: (tx) => {
                    
                }
            }
        }
    }

    static async destroy () {
        let db = await Connection.getConnection();
        let rs = await db.executeSql(
            ` DROP TABLE LICHNGAY `,
            []
        );
        // await Seed.excute(Seed.deleteTable().AnnualSchedule,
        // await Seed.excute(Seed.deleteTable().MonthlySchedule,
        // await Seed.excute(Seed.deleteTable().Spenses,
        // async () => await Seed.excute(Seed.deleteTable().MonthlySchedule,
        // async () => await Seed.excute(Seed.deleteTable().DailySchedule,
        // async () => await Seed.excute(Seed.deleteTable().Type,
        // // async () => await Seed.excute(Seed.deleteTable().Spenses,
        // async () => await AsyncStorage.setItem('Time',0))
    }

    static async init () {
        AsyncStorage.getItem('Time',async (err,rs) => {
            if (err || !rs){
                console.log('error init', err);
                // await Seed.excute(Seed.tableName().Type,
                // await Seed.excute(Seed.tableName().AnnualSchedule,
                await Seed.excute(Seed.tableName().Spenses,
                // async () => await Seed.excute(Seed.tableName().AnnualSchedule,
                // async () => await Seed.excute(Seed.tableName().MonthlySchedule,
                // async () => await Seed.excute(Seed.tableName().DailySchedule,
                // async () => await Seed.excute(Seed.tableName().Spenses,
                async ()=> await AsyncStorage.setItem('Time',1))
                return;
            }
            rs = parseInt(rs) + 1;
            AsyncStorage.setItem('Time',rs);
        })
        
    }

    static async seedValue () {
        let db = await Connection.getConnection();
        await db.transaction((tx)=>{
            tx.executeSql(`INSERT INTO LOAICHITIEU VALUES(?,?)`,
            [0,'Không tên'],
            (tx,result)=>{
                console.log('result',result.rowsAffected);
            },(error)=>{
                console.log('err',error);
            });
        })
    }

}


   
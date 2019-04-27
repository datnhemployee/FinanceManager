import Connection from "./Connection";
import { AsyncStorage } from "react-native";

export default class Seed{
    
    static tableName () {
        return {
            Type:`CREATE TABLE "LOAICHITIEU" (
                    "MaLoaiChiTieu"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                    "TenLoaiChiTieu"	TEXT NOT NULL
                );`,
            AnnualSchedule: `CREATE TABLE "LICHNAM" (
                "Nam"	INTEGER NOT NULL CHECK(Nam>0) UNIQUE,
                "TongNam"	INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY("Nam")
            );`,
            MonthlySchedule: `CREATE TABLE "LICHTHANG" (
                "Thang"	INTEGER NOT NULL CHECK(Thang>0) UNIQUE,
                "Nam"	INTEGER NOT NULL CHECK(Nam>0),
                "TongThang"	INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY("Thang"),
                FOREIGN KEY("Nam") REFERENCES "LICHNAM"("Nam") ON DELETE CASCADE
            );`,
            DailySchedule: `CREATE TABLE "LICHNGAY" (
                "Ngay"	INTEGER NOT NULL CHECK(Ngay>0) UNIQUE,
                "TongChiTieu"	INTEGER NOT NULL DEFAULT 0,
                "Thang"	INTEGER NOT NULL CHECK(Thang>0),
                PRIMARY KEY("Ngay"),
                FOREIGN KEY("Thang") REFERENCES "LICHTHANG"("Thang") ON DELETE CASCADE
            );`,
            Spenses: `CREATE TABLE "CHITIEU" (
                "MaChiTieu"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                "TenChiTieu"	INTEGER NOT NULL UNIQUE,
                "MaLoaiChiTieu"	REAL DEFAULT 0,
                "Gia"	INTEGER NOT NULL DEFAULT 0,
                "GhiChu"	TEXT,
                "Ngay"	INTEGER NOT NULL,
                FOREIGN KEY("MaLoaiChiTieu") REFERENCES "LOAICHITIEU"("MaLoaiChiTieu") ON DELETE CASCADE
            );`,
        }
    }

    static async excute (
        alias, 
        success= (rs) => {},
        failed = (err)=>{}) {
        let db = await Connection.getConnection();
        await db.transaction((tx)=>{
            tx.executeSql(alias,[],(tx,rs)=>{
                console.log('result',rs);
                success(rs);
            },(err)=>{
                console.log('err',err);
                failed(err);
            });
        })
    }

    static async init () {
        AsyncStorage.getItem('Time',(err,rs) => {
            if (err || !rs){
                console.log('error init', err);
                await Seed.excute(Seed.tableName().Type,
                () => await Seed.excute(Seed.tableName().AnnualSchedule,
                () => await Seed.excute(Seed.tableName().MonthlySchedule,
                () => await Seed.excute(Seed.tableName().DailySchedule,
                () => await Seed.excute(Seed.tableName().Spenses,
                AsyncStorage.setItem('Time',1))))))
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
            [1,'Tạm 1'],
            (tx,result)=>{
                console.log('result',result.rowsAffected);
            },(error)=>{
                console.log('err',error);
            });
        })
    }

}


   
import Datastore from "react-native-local-mongodb";
import Codes from "../constant/Codes";
import Color from "../styles/Color";

const TypeDatastore = new Datastore({
    filename: "Type",
    autoload: true,
})

export default class TypeRepository {
    static getAll () {
        return {
            code: Codes.Success,
            content: TypeDatastore.getAllData(),
        }
    }

    static find (name) {
        let result = {
            code: Codes.None,
        }
        TypeDatastore.findOne({
            name: name,
        },(err,res)=>{
            if(err) {
                result = {
                    code: Codes.Exception,
                    content: `Không thể tìm thấy loại chi tiêu.`,
                }
            } else {
                result = {
                    code: Codes.Success,
                    content: res,
                }
            }
        })

        return result;
    }


    static async check (type) {

        let matchColorArray = await TypeDatastore.findAsync({
            color: type.color,
        });
        let matchIndex = matchColorArray.findIndex((val)=> val.name[0]===type.name[0]);


        return TypeRepository.find(name).code === Codes.Success ?
            `Không thể thêm chi tiêu cùng tên.`:
            matchIndex != -1 ?
            `Không thể thêm chi tiêu cùng chữ cái đầu và cùng màu.`:
            undefined;
    }

    static async insert (type) {
        let constraint = await TypeRepository.check(type);
        if(!constraint){
            return {
                code: Codes.Success,
                content: await TypeDatastore.insertAsync(type),
            };
        }
        return {
            code: Codes.Failed,
            content: constraint,
        }
    }

    // Không có update và delete vì sẽ làm hư hoàn toàn cơ sở dữ liệu
}
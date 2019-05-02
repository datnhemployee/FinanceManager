import ConstantValue from "../constant/ConstantValue";
import { AsyncStorage } from "react-native";

const INIT_NUMBER = ConstantValue.INIT_NUMBER;

export default class IDGenerater {
    static nextID_Spense = 'nextID_Spense';
    static nextID_Type = 'nextID_Type';

    static async getNextID (name) {
        let result = INIT_NUMBER;
        await AsyncStorage.getItem(
            name,
            async (err,rs) => {
                if(err) {
                    await AsyncStorage.setItem(
                        name,
                        INIT_NUMBER,
                        (err)=> {
                            console.log(err.message);
                        }
                    )
                    return;
                }
                result = rs + 1;
            })
        return result;
    }

    static async saveChange (name) {
        let id = IDGenerater.getNextID(name);

        await AsyncStorage.setItem(
            name,
            id,
            (err) =>{
                console.log("saveChange Error: "+ err);
            }
        )

    }
}
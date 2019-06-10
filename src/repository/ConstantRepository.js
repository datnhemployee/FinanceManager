import { AsyncStorage } from "react-native";
import Codes from "../constant/Codes";


export default class ConstantRepository {
    static async getMaxPage () {
        let result = {}
        let maxPageFromDB = await AsyncStorage.getItem(`maxPage`);

        if (!!maxPageFromDB){
            return {
                code: Codes.Success,
                content: parseInt(maxPageFromDB),
            }
        }
        await AsyncStorage.setItem(`maxPage`,''+1);
        result = {
            code: Codes.Success,
            content: 1,
        }

        return result;
    }

    static async setMaxPage (value) {
        
        value = '' + value;
        await AsyncStorage.removeItem(`maxPage`);
        await AsyncStorage.setItem(`maxPage`,value)
        return {
            code: Codes.Success,
            content: value,
        };
    }

    static async getWallet () {
        let result = {}
        let walletFromDB = await AsyncStorage.getItem(`wallet`);
        // console.log('wallet getWallet',JSON.stringify(walletFromDB));

        if (!!walletFromDB){
            return {
                code: Codes.Success,
                content: parseInt(walletFromDB),
            }
        }
        await AsyncStorage.setItem(`wallet`,''+0);
        result = {
            code: Codes.Success,
            content: 0,
        }

        return result;
    }

    static async setWallet (value) {
        
        value = '' + value;
        await AsyncStorage.removeItem(`wallet`);
        await AsyncStorage.setItem(`wallet`,value)
        return {
            code: Codes.Success,
            content: value,
        };
    }
}
import Datastore from "react-native-local-mongodb";
import Type from "../model/Type";

let typeDoc = new Datastore({
    filename: 'Type',
    autoload: true,
})

export default class TypeController {
    static async isIncome(typeID) {
        let result = await typeDoc.findOneAsync({
            _id: typeID,
        });
        if(!result) return null;
        return result.isIncome;
    }

    static async insert (type) {
        if(!type) return null;

        let result = await typeDoc.insertAsync({
            ...type,
        });
        return result;
    }

    static async insert (type) {
        if(!type) return null;

        let result = await typeDoc.updateAsync({
            _id: type._id,
        });
        return result;
    }

    static async delete (type) {
        if(!type) return null;

        let result = await typeDoc.removeAsync({
            _id: type._id,
        });
        return result;
    }

    static async seed () {

        let result = await typeDoc.insertAsync({
            ...Type.default(),
        });
        return result;
    }
}
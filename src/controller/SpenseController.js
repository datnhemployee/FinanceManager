import Datastore from "react-native-local-mongodb";
import Spense from "../model/Spense";
import IDGenerater from "../model/IDGenerater";

let SpenseDoc = new Datastore({
    filename: 'Spense',
    autoload: true,
})

let TypeDoc = new Datastore({
    filename: 'Type',
    autoload: true,
})

export default class SpenseController{
    constructor () {}

    static async existType (_id) {
        if (_id === undefined
            || _id === null)
            return false;
        let temp = (_id < (await IDGenerater.getNextID(IDGenerater.nextID_Type)));
        console.log(`So sánh`, temp)
        return temp;
    }

    static async insert (spense) {
        if(!spense 
            || spense === null
            || !SpenseController.existType(spense.type))
            return false;
        console.log(`insert nè`, JSON.stringify(spense))
        return await SpenseDoc.insertAsync(spense);
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
}
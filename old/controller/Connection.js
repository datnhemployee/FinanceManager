import Datastore from "react-native-local-mongodb";

export default class Connection{
    constructor () {
    }
    static async getConnection () {
       let dataStore = new Datastore({
           filename: 'Spense',
           
        })
    }
}

//SQLite.DEBUG(true);
    //SQLite.enablePromise(true);

    // let connection = await SQLite.openDatabase({
    //    name: "TestDatabase",
    //    createFromLocation: "~testMySelf.db",
    //}).catch((err)=> {
    //  console.log(err);
    //});
    //console.log(connection)
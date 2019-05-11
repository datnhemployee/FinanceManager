

export default class Connection{
    constructor () {
    }
    static async getConnection () {
        DEBUG(true);
        enablePromise(true);
        
        return await openDatabase({
            name: "Spenses",
        });
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
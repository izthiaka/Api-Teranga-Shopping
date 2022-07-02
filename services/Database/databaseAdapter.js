const MongoDatabase =  require("./MongoDatabase.js").default

class DatabaseAdapter{
    constructor(database = new MongoDatabase()) {
        this._database = database
    }

    async connectDatabase(){
        await this._database.connect()
    }

    async closeDatabase(){
        await this._database.close()
    }
}

module.exports = { default: DatabaseAdapter }

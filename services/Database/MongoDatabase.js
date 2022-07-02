const mongoose = require("mongoose")

class MongoDatabase{
    async connect(){
        try{
            const DATABASE_NAME = process.env.MONGO_DB
            await mongoose.connect(DATABASE_NAME)
            console.log(`Connected To Database : ${DATABASE_NAME}`)
        }catch (error){
            throw error
        }
    }


    async close(){
        await mongoose.connection.close()
    }
}

module.exports = { default: MongoDatabase }

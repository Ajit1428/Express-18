const { MongoClient } = require("mongodb");
const { DB } = require("../../config/constant");

class DbService {
    connection;
    database;
    constructor(){
        this.connect()
    }
    connect = async() => {
        try {
            this.connection =  await MongoClient.connect(DB.URL)
            this.database = this.connection.db(DB.NAME)
        } 
        catch (err) 
        {
            throw {status: 500, msg: "Error connecting to the database"}
        }
    }

    createOne = async (collectionName, data) => {
        let response = await this.database.collection(collectionName).insertOne(data)
        return response
    }

    getSingleOne = async (collectionName, filter={}) => {
        try 
        {
            let response = await this.database.collection(collectionName).findOne(filter)
            return response    
        } catch (error) {
            throw {status: 500, msg:"Error while getting the single data..."}
        }
       
    }
}


module.exports = DbService;
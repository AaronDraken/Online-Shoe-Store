const dbConfig = require('../config/DBConfig').dbConfig;
const { ObjectId } = require('mongodb');
const dbConnection = require('../DBConnections/DBConnections');

class AdminDB {
    static async addAdmin(insertPayload){
        try {
            let adminPayload= {
              name:insertPayload.name,
              email:insertPayload.email,
              password:insertPayload.password,
            }
  
            let selectedCollection = await dbConnection(dbConfig.adminCollection);
            let result = await selectedCollection.insertOne(adminPayload);
            return result;
  
        } catch (error) {
            console.log(error);
        }
    }

    static async authenticateAdmin(criteria) {
      let selectedCollection = await dbConnection(dbConfig.adminCollection);
      let result = await selectedCollection.findOne(criteria);
      return result;
    }
  
    static async adminById(criteria) {
      let selectedCollection = await dbConnection(dbConfig.adminCollection);
      let result = await selectedCollection.findOne({"_id":new ObjectId(criteria.aid)});
      return result;
    }
}

module.exports = AdminDB;
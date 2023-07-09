const dbConfig = require('../config/DBConfig').dbConfig;
const dbConnection = require('../DBConnections/DBConnections');
const { ObjectId } = require("mongodb");

class UserDB {
  static async addUser(insertPayload) {
    try {
      let date = new Date();
      let userPayload = {
        name: insertPayload.name,
        email: insertPayload.email,
        contact: insertPayload.contact,
        address: insertPayload.address,
        password: insertPayload.password,
        createdAt: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }

      let selectedCollection = await dbConnection(dbConfig.userCollection);
      let result = await selectedCollection.insertOne(userPayload);
      return result;

    } catch (error) {
      console.log(error);
    }
  }

  //to 'get' all customers info
  static async getAllUsers() {
    let selectedCollection = await dbConnection(dbConfig.userCollection);
    let result = await selectedCollection.find({}).toArray();
    return result;
  }

  static async authenticateUser(criteria) {
    let selectedCollection = await dbConnection(dbConfig.userCollection);
    let result = await selectedCollection.findOne(criteria);
    return result;
  }

  static async userById(criteria) {
    let selectedCollection = await dbConnection(dbConfig.userCollection);
    let result = await selectedCollection.findOne({ "_id": new ObjectId(criteria.uid) });
    return result;
  }

  static async updateUser(updatePayload) {
    let selectedCollection = await dbConnection(dbConfig.userCollection);
    let result = await selectedCollection.updateOne({ "_id": new ObjectId(updatePayload.uid) }, { $set: { name: updatePayload.name, email: updatePayload.email, contact: updatePayload.phone, address:updatePayload.address } });
    return result;
  }

  static async deleteUser(deletePayload) {
    let selectedCollection = await dbConnection(dbConfig.userCollection);
    let result = await selectedCollection.deleteOne({ "_id": new ObjectId(deletePayload.uid) });
    return result;
  }
}


module.exports = UserDB;
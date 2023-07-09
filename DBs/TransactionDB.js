const dbConfig = require('../config/DBConfig').dbConfig;
const { ObjectId } = require('mongodb');
const dbConnection = require('../DBConnections/DBConnections');
const OrderDB = require('./../DBs/OrderDB');

class TransactionDB {
  static async addTransaction(insertPayload) {
    try {
        let date=new Date();
        let transactionPayload= {
            uid:insertPayload.uid,
            amount:insertPayload.amount,
            cardNo:insertPayload.cardNo,
            transactionDate:date.getFullYear() +'-' +(date.getMonth() + 1) +'-' +date.getDate()
        }

        let selectedCollection = await dbConnection(dbConfig.transactionCollection);
        let result = await selectedCollection.insertOne(transactionPayload);

        if (result.acknowledged) {
          let orderPayload = {
            tid: result.insertedId,
            uid:insertPayload.uid,
            pid:insertPayload.pid,
            quantity:insertPayload.quantity,
            price:insertPayload.price,
            total:insertPayload.total
          };

          let orderResult = await OrderDB.addOrder(orderPayload);
          return orderResult;

        } else {
          console.log('Cannot add customer.');
        }

        return result;

    } catch (error) {
        console.log(error);
    }
  }

  //get all Transactions
  static async getAllTransactions() {
    let selectedCollection = await dbConnection(dbConfig.transactionCollection);
    let result = await selectedCollection.find({}).toArray();
    return result;
  }

  static async transactionsByUid(criteria) {
    let selectedCollection = await dbConnection(dbConfig.transactionCollection);
    let result = await selectedCollection.find({"uid":new ObjectId(criteria.uid)}.toArray());
    return result;
  }
}

module.exports = TransactionDB;
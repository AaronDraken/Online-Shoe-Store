const dbConfig = require('../config/DBConfig').dbConfig;
const { ObjectId } = require('mongodb');
const dbConnection = require('../DBConnections/DBConnections');
const ProductDB = require('./../DBs/ProductDB');

class OrderDB {
    static async addOrder(insertPayload) {
        try {
            let date = new Date();
            let orderPayload = {
                uid: insertPayload.uid,
                pid: insertPayload.pid,
                quantity: insertPayload.quantity,
                price: insertPayload.price,
                total: insertPayload.total,
                tid: insertPayload.tid,
                orderDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }

            let selectedCollection = await dbConnection(dbConfig.orderCollection);
            let result = await selectedCollection.insertOne(orderPayload);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    static async getAllOrders() {
        let selectedCollection = await dbConnection(dbConfig.orderCollection);
        let result = await selectedCollection.find({}).toArray();
        return result;
    }

    static async orderById(criteria) {
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.findone({ "_id": new ObjectId(criteria) });
        return result;
    }

    static async latestOrders(criteria) {
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.find({ "uid": criteria.uid }).sort({$natural:-1}).limit(3).toArray();
        console.log(result);
        return result;
    }

    static async ordersByUid(criteria) {
        let selectedCollection = await dbConnection(dbConfig.orderCollection);
        let result = await selectedCollection.find({ "uid": criteria.uid }).toArray();
        let allOrders = [];
        for (let i = 0; i < result.length; i++) {
            let orderDetails = {};
            let res = result[i];
            orderDetails["quantity"] = res["quantity"];
            orderDetails["price"] = res["price"];
            orderDetails["total"] = res["total"];
            orderDetails["orderdate"] = res["orderDate"];
            try {
                let productResult = await ProductDB.productById({ "pid": res.pid });
                orderDetails["pname"] = productResult["pname"];
                orderDetails["pimage"] = productResult["img"];
                allOrders.push(orderDetails);
            } catch (error) {
                console.log(error);
            }
        }
        return allOrders;
    }
}

module.exports = OrderDB;
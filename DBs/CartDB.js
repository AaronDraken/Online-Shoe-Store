const dbConfig = require('../config/DBConfig').dbConfig;
const { ObjectId } = require('mongodb');
const dbConnection = require('../DBConnections/DBConnections');
const ProductDB = require('./../DBs/ProductDB');

class CartDB {
    static async addToCart(insertPayload) {
        try {
            let cartPayload = {
                uid: insertPayload.uid,
                pid: insertPayload.pid,
                quantity: insertPayload.quantity
            }

            let selectedCollection = await dbConnection(dbConfig.cartCollection);
            let result = await selectedCollection.insertOne(cartPayload);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    static async cartsByUid(criteria) {
        let selectedCollection = await dbConnection(dbConfig.cartCollection);
        let result = await selectedCollection.find({ "uid": criteria.uid }).toArray();

        let allCarts = [];
        for (let i = 0; i < result.length; i++) {
            let cartDetails = {};
            let res = result[i];
            cartDetails["cid"] = res["_id"];
            cartDetails["uid"] = res["uid"];
            cartDetails["pid"] = res["pid"];
            cartDetails["quantity"] = res["quantity"];
            try {
                let productResult = await ProductDB.productById({ "pid": res.pid });
                cartDetails["pname"] = productResult["pname"];
                cartDetails["img"] = productResult["img"];
                cartDetails["price"] = productResult["price"];
                allCarts.push(cartDetails);
            } catch (error) {
                console.log(error);
            }
        }
        return allCarts;
    }

    static async cartById(criteria) {
        let selectedCollection = await dbConnection(dbConfig.cartCollection);
        let result = await selectedCollection.findOne({ "_id": new ObjectId(criteria.cid) });
        let cartDetails = {};
        console.log("result", result);
        try {
            let res = result;
            cartDetails["cid"] = res["_id"];
            cartDetails["uid"] = res["uid"];
            cartDetails["pid"] = res["pid"];
            cartDetails["quantity"] = res["quantity"];
            try {
                let productResult = await ProductDB.productById({ "pid": res.pid });
                cartDetails["pname"] = productResult["pname"];
                cartDetails["img"] = productResult["img"];
                cartDetails["price"] = productResult["price"];
            } catch (error) {
                console.log(error);
            }
        } catch (err) {
            console.log(err);
        }


        return cartDetails;
    }

    static async updateCart(updatePayload) {
        let selectedCollection = await dbConnection(dbConfig.cartCollection);
        let result = await selectedCollection.updateOne({ _id: new ObjectId(updatePayload.cid) }, { $set: { quantity: updatePayload.quantity } }, { upsert: false });
        return result;
    }

    static async deleteCartItem(deletePayload) {
        let selectedCollection = await dbConnection(dbConfig.cartCollection);
        let result = await selectedCollection.deleteOne({ _id: new ObjectId(deletePayload.cid) });
        return result;
    }
}

module.exports = CartDB;
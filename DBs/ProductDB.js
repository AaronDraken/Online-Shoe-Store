const dbConnection = require('../DBConnections/DBConnections');
const dbConfig = require('../config/DBConfig').dbConfig;
const {ObjectId} = require("mongodb");

class ProductDB{
    static async addProduct(insertPayload) {
        try {
            let productPayload = {
                pname: insertPayload.pname,
                img: insertPayload.img,
                price: insertPayload.price
            };

            let selectedCollection = await dbConnection(dbConfig.productCollection);
            let result = await selectedCollection.insertOne(productPayload);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    static async getAllProducts(){
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.find({}).toArray();
        return result;
    }

    static async productById(criteria) {
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.findOne({"_id":new ObjectId(criteria.pid)});
        return result;
    }

    static async deleteProduct(deletePayload) {
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.deleteOne({"_id":new ObjectId(deletePayload.pid)});
        return result;
    }

    static async updateProduct(updatePayload) {
        let selectedCollection = await dbConnection(dbConfig.productCollection);
        let result = await selectedCollection.updateOne({"_id":new ObjectId(updatePayload.pid)},{$set:{pname:updatePayload.pname,img:updatePayload.img, price:updatePayload.price}});
        return result;
    }
}

module.exports = ProductDB;
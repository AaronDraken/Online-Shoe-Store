const dbConfig = require('../config/DBConfig').dbConfig;
const dbConnection = require('../DBConnections/DBConnections');
const {ObjectId, Db}=require("mongodb");

class FeedbackDB{
    static async addFeedback(insertPayload){
        try {
            let feedbackPayload = {
                name: insertPayload.name,
                email: insertPayload.email,
                feedback: insertPayload.feedback
            }

            let selectedCollection = await dbConnection(dbConfig.feedbackCollection);
            let result = await selectedCollection.insertOne(feedbackPayload);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    static async getAllFeedbacks(){
        let selectedCollection = await dbConnection(dbConfig.feedbackCollection);
        let result = await selectedCollection.find({}).toArray();
        return result;
    }
}

module.exports = FeedbackDB;
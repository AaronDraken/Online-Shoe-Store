const dbConfig = {
    "url": "mongodb+srv://user:pass@cluster0.khvhq7i.mongodb.net/?retryWrites=true&w=majority",
    "dbName": "PowerShoes",
    "userCollection": "UserDB",
    "adminCollection": "AdminDB",
    "productCollection":"ProductDB",
    "transactionCollection":"TransactionDB",
    "orderCollection": "OrderDB",
    "cartCollection": "CartDB",
    "changelogCollection": "ChangelogDB",
    "feedbackCollection": "FeedbackDB"
}

const portNumber = 3000

module.exports = { dbConfig, portNumber };
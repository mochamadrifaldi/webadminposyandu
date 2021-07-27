/* file: mongodb.js */
const MongoClient = require("mongodb").MongoClient
// const connectionString = "mongodb://localhost:27017"; // tanpa authentication
const connectionString =
"mongodb://user_latihan:123456@localhost:27017?authSource=admin";
MongoClient.connect(connectionString, { useUnifiedTopology: true }, 
(error, client) => {
 if (error) return console.error(error)
 console.log("Server database connect!")
})
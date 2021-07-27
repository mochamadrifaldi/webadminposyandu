/* file: connection.js */
const MongoClient = require("mongodb").MongoClient
const connectionString =
"mongodb+srv://aldi:Railfansdaop1@wpu.sjkqm.mongodb.net/wpu?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, { 
 useUnifiedTopology: true
});
(async () => {
 try {
 await client.connect();
 } catch (error) {
 console.error(error);
}
})();

module.exports = client


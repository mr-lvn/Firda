const { QuickDB } = require("dreamvast.quick.db");
const { MongoDriver } = require("dreamvast.quick.db/MongoDriver");
const { MySQLDriver } = require("dreamvast.quick.db/MySQLDriver");

module.exports = async(client) => {
    console.log("🔜 | Load Database...");
    
    const start = Date.now();
    const mongoDriver = new MongoDriver(process.env.MONGO_URI);
    
    const mySqlDriver = new MySQLDriver({
        host: process.env.MYSQL_HOST,
        port: 18645,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "data"
    });
    
    await mongoDriver.connect();
    await mySqlDriver.connect();
    
    client.db = new QuickDB({ driver: mySqlDriver });
    client.mongo = new QuickDB({ driver: mongoDriver });
    
    console.log(`✅ | Database connected [${Date.now() - start}ms]`);
}
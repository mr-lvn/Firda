const { QuickDB, MongoDriver, MySQLDriver } = require("dreamvast.quick.db");

module.exports = async(client) => {
    console.log("🔜 | Load Database...");
    const mongoDriver = new MongoDriver(process.env.MONGO_URI);
    
    const mySqlDriver = new MySQLDriver({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "data"
    });
    
    await mongoDriver.connect();
    await mySqlDriver.connect();
    
    client.db = new QuickDB({ driver: mySqlDriver });
    client.mongo = new QuickDB({ driver: mongoDriver });
    
    console.log("✅ | Database loaded");
}
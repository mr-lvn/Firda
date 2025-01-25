const { QuickDB, MongoDriver, MySQLDriver } = require("quick.db");

module.exports = async(client) => {
    const mongoDriver = new MongoDriver(process.env.MONGO_URI);
    
    const mySqlDriver = new MySQLDriver({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "data"
    });
    
    try {
        await mongoDriver.connect();
        await mySqlDriver.connect();
    } catch(error) {
        console.info(error);
    }
    
    client.db = new QuickDB({ driver: mySqlDriver });
    client.mongo = new QuickDB({ driver: mongoDriver });
    
    console.log("✅ | Database loaded");
}
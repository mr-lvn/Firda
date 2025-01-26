const UserData = require("../database/user");

module.exports = async(client, userId) => {
    if (!client.db.has(userId)) {
        await client.db.set(userId, UserData);
    }
}
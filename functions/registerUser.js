const UserData = require("../database/user");

module.exports = async(client, userId) => {
    if (!await client.db.has(userId)) {
        await client.db.set(userId, UserData);
    }
}
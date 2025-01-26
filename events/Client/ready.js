const { registerUser } = require("../../functions/")

module.exports = (client) => {
    client.users.cache.forEach(user => registerUser(client, user.id));
    
    client.user.setActivity("Free Fire - Battle in Style");
    console.log(`🆙 | ${client.user.username} is ready`);
}
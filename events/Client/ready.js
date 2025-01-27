const { Guild, User } = require("../../database/register");

module.exports = (client) => {
    client.guilds.cache.forEach(guild => Guild(client, guild.id));
    client.users.cache.forEach(user => User(client, user.id));
    
    client.user.setActivity("Free Fire - Battle in Style");
    console.log(`🆙 | ${client.user.username} is ready`);
}
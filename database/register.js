const GuildData = require("./Guild");
const UserData = require("./User");
const EconomyData = require("./Economy");
const LevelingData = require("./Leveling");


exports.Guild = async(client, guildId) => {
    const guild = await client.db.guild.get(guildId);
    
    if (!guild?.registered) {
        GuildData.registered = true;
        await client.db.guild.set(guildId, GuildData);
    }
};

exports.User = async(client, userId) => {
    const user = await client.db.user.get(userId);
    
    if (!user?.registered) {
        await client.db.economy.set(userId, EconomyData);
        await client.db.leveling.set(userId, LevelingData);
        
        UserData.registered = true;
        await client.db.user.set(userId, UserData);
    }
};
